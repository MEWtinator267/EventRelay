import "dotenv/config";
import { Pool } from "pg";
import dns from "node:dns";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  keepAlive: true,
  connectionTimeoutMillis: 8000,
  lookup: (host, _opts, cb) => dns.lookup(host, { family: 4 }, cb),
});

// Log target host/port without exposing credentials
try {
  const u = new URL(process.env.DATABASE_URL);
  console.log("PG target:", `${u.hostname}:${u.port || "5432"}`);
} catch {}

pool.on("error", (err) => {
  console.error("Unexpected PG error:", err);
});

export default pool;