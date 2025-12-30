export const eventsData = [
  {
    id: "evt_1001",
    type: "order.created",
    status: "SUCCESS",
    attempts: 1,
    timestamp: "2025-01-18 10:35 AM",
  },
  {
    id: "evt_1002",
    type: "payment.failed",
    status: "FAILED",
    attempts: 3,
    timestamp: "2025-01-18 10:40 AM",
  },
  {
    id: "evt_1003",
    type: "user.signup",
    status: "SUCCESS",
    attempts: 1,
    timestamp: "2025-01-18 10:45 AM",
  },
  {
    id: "evt_1004",
    type: "order.created",
    status: "DLQ",
    attempts: 5,
    timestamp: "2025-01-18 10:50 AM",
  },
];