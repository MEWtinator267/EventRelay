import { Queue } from "bullmq";
import redis from "../redis.js";

export const deliveryQueue = new Queue("delivery-queue", {
  connection: redis,
});