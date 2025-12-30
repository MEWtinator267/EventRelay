import pool from "../db.js";
import { deliveryQueue } from "../queues/delivery.queue.js";

export const createEvent = async (req, res) => {
  const { type, payload } = req.body;

  if (!type || !payload) {
    return res.status(400).json({ error: "Invalid event data" });
  }

  try {
    // 1️⃣ Store event
    const eventResult = await pool.query(
      `INSERT INTO events (event_type, payload)
       VALUES ($1, $2)
       RETURNING *`,
      [type, payload]
    );

    const event = eventResult.rows[0];

    // 2️⃣ Enqueue delivery job
    // 2️⃣ Fetch subscribed webhooks
const webhookResult = await pool.query(
  `
  SELECT * FROM webhooks
  WHERE $1 = ANY(subscribed_events)
    AND status = 'ACTIVE'
  `,
  [type]
);

for (const webhook of webhookResult.rows) {
  await deliveryQueue.add(
    "deliver-event",
    {
      eventId: event.id,
      eventType: event.event_type,
      payload: event.payload,
      webhookId: webhook.id,
      webhookUrl: webhook.url,
      secret: webhook.secret,
    },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 2000,
      },
    }
  );
}

    res.status(201).json({
      message: "Event accepted for delivery",
      event,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal error" });
  }
};

export const getEvents = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT 
        e.id,
        e.event_type,
        e.created_at,
        MAX(d.status) AS status,
        COUNT(d.id) AS attempts
      FROM events e
      LEFT JOIN deliveries d ON d.event_id = e.id
      GROUP BY e.id
      ORDER BY e.created_at DESC
      `
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const getEventDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await pool.query(
      "SELECT * FROM events WHERE id = $1",
      [id]
    );

    const deliveries = await pool.query(
      `
      SELECT *
      FROM deliveries
      WHERE event_id = $1
      ORDER BY created_at ASC
      `,
      [id]
    );

    res.json({
      event: event.rows[0],
      deliveries: deliveries.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Event details failed" });
  }
};