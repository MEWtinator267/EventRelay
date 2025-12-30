import pool from "../db.js";

export const getMetrics = async (req, res) => {
  try {
    const totalEvents = await pool.query(
      "SELECT COUNT(*) FROM events"
    );

    const failedDeliveries = await pool.query(
      "SELECT COUNT(*) FROM deliveries WHERE status = 'FAILED'"
    );

    const dlqCount = await pool.query(
      "SELECT COUNT(*) FROM deliveries WHERE status = 'DLQ'"
    );

    const activeWebhooks = await pool.query(
      "SELECT COUNT(*) FROM webhooks WHERE status = 'ACTIVE'"
    );

    res.json({
      totalEvents: Number(totalEvents.rows[0].count),
      failedDeliveries: Number(failedDeliveries.rows[0].count),
      dlqCount: Number(dlqCount.rows[0].count),
      activeWebhooks: Number(activeWebhooks.rows[0].count),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Metrics fetch failed" });
  }
};