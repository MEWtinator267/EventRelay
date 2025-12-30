export const webhooksData = [
  {
    id: "wh_001",
    url: "https://api.shop.com/webhooks/orders",
    events: ["order.created", "order.updated"],
    status: "ACTIVE",
    retryPolicy: "3 attempts (exponential)",
    lastDelivery: "2025-01-18 10:45 AM",
  },
  {
    id: "wh_002",
    url: "https://api.payments.com/webhooks/payments",
    events: ["payment.failed"],
    status: "INACTIVE",
    retryPolicy: "5 attempts (exponential)",
    lastDelivery: "2025-01-18 09:20 AM",
  },
];