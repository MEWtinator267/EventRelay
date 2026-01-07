import IORedis from "ioredis";

const redisUrl = process.env.REDIS_URL;

const redis = redisUrl
  ? new IORedis(redisUrl, { maxRetriesPerRequest: null })
  : new IORedis({
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: parseInt(process.env.REDIS_PORT || "6379"),
      // BullMQ requires disabling this retry logic for blocking commands
      maxRetriesPerRequest: null,
    });

export default redis;