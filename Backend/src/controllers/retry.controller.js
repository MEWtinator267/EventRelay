import pool from "../db.js";
import { deliveryQueue } from "../queues/delivery.queue.js";

export const retryDLQ = async (req, res) => {
  const { deliveryId } = req.params;

  try {
    // Fetch original delivery + event data
    const result = await pool.query(`
      SELECT
        d.event_id,
        d.webhook_url,
        e.event_type,
        e.payload
      FROM deliveries d
      JOIN events e ON e.id = d.event_id
      WHERE d.id = $1
    `, [deliveryId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Delivery not found" });
    }

    const data = result.rows[0];

    // Re-enqueue delivery job (NEW attempt)
    await deliveryQueue.add(
      "deliver-event",
      {
        eventId: data.event_id,
        eventType: data.event_type,
        payload: data.payload,
        webhookUrl: data.webhook_url,
      },
      {
        attempts: 3,
        backoff: { type: "exponential", delay: 2000 },
      }
    );

    res.json({ message: "Retry queued successfully" });
  } catch (err) {
    console.error("Retry error:", err);
    res.status(500).json({ error: "Retry failed" });
  }
};