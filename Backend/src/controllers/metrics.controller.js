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

export const getDashboardCharts = async (req, res) => {
  try {
    const throughput = await pool.query(`
      SELECT
        DATE_TRUNC('hour', created_at) AS hour,
        COUNT(*)::int AS count
      FROM events
      WHERE created_at >= NOW() - INTERVAL '24 hours'
      GROUP BY hour
      ORDER BY hour
    `);

    const deliveryStatus = await pool.query(`
      SELECT
        status,
        COUNT(*)::int AS count
      FROM deliveries
      GROUP BY status
    `);

    res.json({
      throughput: throughput.rows.map(r => ({
        hour: r.hour.toISOString().slice(11, 16),
        count: r.count,
      })),
      deliveryStatus: deliveryStatus.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chart metrics failed" });
  }
};