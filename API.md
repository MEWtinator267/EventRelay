# EventRelay API Documentation

Base URL:
http://localhost:4000/api

---

## Create Event

POST /events

Headers:
Authorization: Bearer <API_KEY>
Content-Type: application/json

Body:
{
  "type": "order.created",
  "payload": {
    "order_id": "ORD_123",
    "amount": 500
  }
}

Response:
201 Created

## Dashboard Metrics

GET /metrics

Response:
{
  "totalEvents": 10,
  "failedDeliveries": 1,
  "dlqCount": 0,
  "activeWebhooks": 2
}

## Events

GET /events

Response:
[
  {
    "id": 1,
    "event_type": "order.created",
    "status": "SUCCESS",
    "attempts": 1
  }
]

## Event Details

GET /events/:id

Response:
{
  "event": { ... },
  "deliveries": [ ... ]
}

## Webhooks

GET /webhooks

## Dead Letter Queue

GET /dlq