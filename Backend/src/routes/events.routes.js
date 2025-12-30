import express from "express";
import { apiKeyAuth } from "../middleware/apiKeyAuth.js";
import { createEvent } from "../controllers/events.controller.js";
import { getEvents,getEventDetails } from "../controllers/events.controller.js";

const router = express.Router();

router.post("/", apiKeyAuth, createEvent);
router.get("/", getEvents);
router.get("/:id", getEventDetails);

export default router;