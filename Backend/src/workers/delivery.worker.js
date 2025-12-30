import { Worker } from "bullmq";
import redis from "../redis.js";
import pool from "../db.js";
import axios from "axios";
import { DELIVERY_STATUS } from "../constants/deliveryStatus.js";
import { generateSignature } from "../utils/signature.js";

const worker = new Worker(
  "delivery-queue",
  async (job) => {
    const {
      eventId,
      eventType,
      payload,
      webhookId,
      webhookUrl,
      secret,
    } = job.data;

    const attempt = job.attemptsMade + 1;
    const signature = generateSignature(payload, secret);

    try {
      const response = await axios.post(
        webhookUrl,
        {
          type: eventType,
          payload,
        },
        {
          headers: {
            "X-Event-ID": eventId,
            "X-Signature": signature,
          },
        }
      );

      await pool.query(
        `
        INSERT INTO deliveries
        (event_id, status, attempts, response_code, webhook_url)
        VALUES ($1, $2, $3, $4, $5)
        `,
        [
          eventId,
          DELIVERY_STATUS.SUCCESS,
          attempt,
          response.status,
          webhookUrl,
        ]
      );

      return true;
    } catch (err) {
      const isLastAttempt = attempt >= job.opts.attempts;

      await pool.query(
        `
        INSERT INTO deliveries
        (event_id, status, attempts, last_error, webhook_url)
        VALUES ($1, $2, $3, $4, $5)
        `,
        [
          eventId,
          isLastAttempt
            ? DELIVERY_STATUS.DLQ
            : DELIVERY_STATUS.FAILED,
          attempt,
          err.message,
          webhookUrl,
        ]
      );

      if (isLastAttempt) return true;
      throw err;
    }
  },
  { connection: redis }
);

console.log("Worker running with multi-webhook support");