import express from "express";
import { getDLQ } from "../controllers/dlq.controller.js";

const router = express.Router();
router.get("/", getDLQ);
export default router;