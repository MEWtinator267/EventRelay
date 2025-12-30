import express from "express";
import { getWebhooks } from "../controllers/webhooks.controller.js";

const router = express.Router();
router.get("/", getWebhooks);
export default router;