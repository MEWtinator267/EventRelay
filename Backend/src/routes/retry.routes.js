import express from "express";
import { retryDLQ } from "../controllers/retry.controller.js";

const router = express.Router();
router.post("/dlq/:deliveryId/retry", retryDLQ);

export default router;