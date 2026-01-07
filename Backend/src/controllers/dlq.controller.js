import pool from "../db.js";

export const getDLQ = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        d.id AS delivery_id,
        e.id AS event_id,
        e.event_type,
        d.attempts,
        d.last_error,
        d.webhook_url,
        d.created_at
      FROM deliveries d
      JOIN events e ON e.id = d.event_id
      WHERE d.status = 'DLQ'
      ORDER BY d.created_at DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch DLQ" });
  }
};