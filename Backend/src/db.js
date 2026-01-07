import { Pool } from "pg";
import dns from "node:dns";

// Force IPv4 DNS resolution globally
dns.setDefaultResultOrder("ipv4first");

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  keepAlive: true,
  connectionTimeoutMillis: 8000,
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