export const eventDetails = {
  id: "evt_1002",
  type: "payment.failed",
  status: "FAILED",
  createdAt: "2025-01-18 10:40 AM",

  payload: {
    order_id: "ORD_77881",
    user_id: "USR_1021",
    amount: 2500,
    currency: "INR",
    reason: "Insufficient balance",
  },

  deliveries: [
    {
      attempt: 1,
      status: "FAILED",
      responseCode: 500,
      error: "Webhook timeout",
      timestamp: "10:40:10 AM",
    },
    {
      attempt: 2,
      status: "FAILED",
      responseCode: 502,
      error: "Bad gateway",
      timestamp: "10:40:40 AM",
    },
    {
      attempt: 3,
      status: "FAILED",
      responseCode: 500,
      error: "Internal server error",
      timestamp: "10:41:20 AM",
    },
  ],
};