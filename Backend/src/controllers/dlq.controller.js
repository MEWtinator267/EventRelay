import pool from "../db.js";

export const getDLQ = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM deliveries
      WHERE status = 'DLQ'
      ORDER BY created_at DESC
      `
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DLQ fetch failed" });
  }
};