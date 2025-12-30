import express from "express";
import cors from "cors";
import metricsRoutes from "./routes/metrics.routes.js";
import eventsRoutes from "./routes/events.routes.js";
import webhooksRoutes from "./routes/webhooks.routes.js";
import dlqRoutes from "./routes/dlq.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/events", eventsRoutes);
app.use("/api/metrics", metricsRoutes);
app.use("/api/webhooks", webhooksRoutes);
app.use("/api/dlq", dlqRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;