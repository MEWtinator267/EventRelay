export const dlqData = [
  {
    id: "dlq_001",
    eventId: "evt_1004",
    eventType: "order.created",
    reason: "Max retry attempts exceeded",
    attempts: 5,
    lastError: "Webhook timeout",
    timestamp: "2025-01-18 10:50 AM",
  },
  {
    id: "dlq_002",
    eventId: "evt_1007",
    eventType: "payment.failed",
    reason: "Subscriber returned 500",
    attempts: 5,
    lastError: "Internal server error",
    timestamp: "2025-01-18 11:05 AM",
  },
];