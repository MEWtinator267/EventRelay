import express from "express";
import { getMetrics , getDashboardCharts } from "../controllers/metrics.controller.js";

const router = express.Router();

router.get("/", getMetrics);
router.get("/charts", getDashboardCharts);

export default router;