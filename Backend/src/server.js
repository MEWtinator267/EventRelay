

import app from "./app.js";
import pool from "./db.js";

const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config();
}

async function start() {
  try {
    // Connect first; only start server if DB is reachable
    await pool.query("SELECT 1");
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`EventRelay backend running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
}

start();