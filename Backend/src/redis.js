import IORedis from "ioredis";

const redis = new IORedis({
  host: "127.0.0.1",
  port: 6379,
  // BullMQ requires disabling this retry logic for blocking commands
  maxRetriesPerRequest: null,
});

export default redis;