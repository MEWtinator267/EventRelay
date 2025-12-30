# EventRelay

EventRelay is an event-driven webhook delivery system that reliably delivers application events to subscribed consumers using asynchronous processing, retries, and dead-letter queues.

## Why EventRelay?

Modern applications generate events such as order creation, payments, and user actions. 
Delivering these events synchronously to external systems causes reliability and scalability issues.

EventRelay solves this by:
- Accepting events via a simple HTTP API
- Processing deliveries asynchronously
- Retrying failed deliveries automatically
- Isolating permanent failures in a Dead Letter Queue (DLQ)

## Architecture Overview

Client Application
    ↓
Event Ingestion API (Express)
    ↓
PostgreSQL (Events)
    ↓
Redis Queue (BullMQ)
    ↓
Background Workers
    ↓
Subscriber Webhooks

## Core Features

- Event ingestion via REST API
- Asynchronous event delivery using BullMQ
- Fan-out delivery to multiple subscribers
- Exponential retry mechanism
- Dead Letter Queue (DLQ) for permanent failures
- Secure webhook delivery using HMAC signatures
- Admin dashboard for observability

## Tech Stack

### Backend
- Node.js
- Express
- PostgreSQL (Supabase)
- Redis
- BullMQ

### Frontend
- React (Vite)
- Tailwind CSS
- Axios

### Infrastructure
- Redis for queues
- Background workers for async processing

## Event Flow

1. A client sends an event to `POST /api/events`
2. Event is stored in PostgreSQL
3. Matching webhooks are fetched from the database
4. A delivery job is enqueued per webhook
5. Workers deliver events asynchronously
6. Failed deliveries are retried automatically
7. Permanently failed deliveries are moved to DLQ

## API Overview

### Create Event
POST /api/events

### Dashboard Metrics
GET /api/metrics

### Events
GET /api/events
GET /api/events/:id

### Webhooks
GET /api/webhooks

### Dead Letter Queue
GET /api/dlq

## Running Locally

### Prerequisites
- Node.js
- Redis
- PostgreSQL

### Backend
cd eventrelay-backend
npm install
npm run dev

### Worker
node src/workers/delivery.worker.js

### Frontend
cd eventrelay-ui
npm install
npm run dev

## Design Decisions

- Authentication is API-key based to keep ingestion fast
- Event delivery is fully asynchronous to avoid blocking clients
- Webhook configuration is database-driven, not hardcoded
- One delivery job is created per subscriber for isolation

## Future Improvements

- User authentication and organization-level access
- Webhook CRUD APIs
- Dashboard pagination and filtering
- Terraform-based AWS deployment