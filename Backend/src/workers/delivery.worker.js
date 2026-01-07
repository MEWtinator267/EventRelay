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
      deliveryId,  // If provided, this is a retry - update existing record
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

      // If deliveryId exists (retry), UPDATE the existing record; otherwise INSERT new
      if (deliveryId) {
        await pool.query(
          `
          UPDATE deliveries
          SET status = $1, attempts = attempts + 1, response_code = $2, last_error = NULL
          WHERE id = $3
          `,
          [DELIVERY_STATUS.SUCCESS, response.status, deliveryId]
        );
      } else {
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
      }

      return true;
    } catch (err) {
      const isLastAttempt = attempt >= job.opts.attempts;
      const status = isLastAttempt ? DELIVERY_STATUS.DLQ : DELIVERY_STATUS.FAILED;

      // If deliveryId exists (retry), UPDATE the existing record; otherwise INSERT new
      if (deliveryId) {
        await pool.query(
          `
          UPDATE deliveries
          SET status = $1, attempts = attempts + 1, last_error = $2
          WHERE id = $3
          `,
          [status, err.message, deliveryId]
        );
      } else {
        await pool.query(
          `
          INSERT INTO deliveries
          (event_id, status, attempts, last_error, webhook_url)
          VALUES ($1, $2, $3, $4, $5)
          `,
          [
            eventId,
            status,
            attempt,
            err.message,
            webhookUrl,
          ]
        );
      }

      if (isLastAttempt) return true;
      throw err;
    }
  },
  { connection: redis }
);

console.log("Worker running with multi-webhook support");