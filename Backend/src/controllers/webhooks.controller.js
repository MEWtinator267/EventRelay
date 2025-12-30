import pool from "../db.js";

export const getWebhooks = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM webhooks ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch webhooks" });
  }
};