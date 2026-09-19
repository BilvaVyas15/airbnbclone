# Architecture Notes — Production-Scale Vacation Rental Marketplace

Diagram: `architecture-diagram.png` / `architecture-diagram.pdf`

## Frontend
- Next.js listing pages are pre-rendered (SSG) or incrementally
  regenerated (ISR) for listings that change infrequently, so most reads
  hit the CDN edge, not an app server.
- The Photo Tour and Lightbox are client components (interaction-heavy,
  no SEO value), keeping the initial server-rendered payload small.
- Static assets and rendered HTML are served from a CDN/edge network close
  to the user; only booking/search/mutation calls cross to the API tier.

## Backend
- Split into stateless services by responsibility (Listing, Booking,
  Search) behind a single API gateway, so each can scale independently —
  Search traffic during a flash sale shouldn't force Booking to scale.
- All app-tier services are stateless and horizontally autoscaled
  (CPU/request-based), with session/rate-limit state pushed to Redis
  rather than kept in-process.

## Storage
- Postgres as the system of record for listings/bookings/users, with
  regional read replicas to keep listing-page reads fast globally; writes
  (bookings, price changes) go to the primary.
- Redis in front of Postgres for hot listing pages and session data.
- Original photos live in object storage (S3); an image-processing worker
  fleet, triggered via the message queue on upload, generates the resized
  variants actually served through the Image CDN — so the app tier never
  does synchronous image work.

## Search
- A dedicated search index (OpenSearch/Elasticsearch), sharded by region,
  kept in sync via the message queue rather than synchronous writes from
  the Listing Service — a listing update should never block on reindexing.

## Deployment / scaling strategy
- CI/CD (GitHub Actions) builds, tests, and canary-deploys each service
  independently.
- Multi-region active-active deployment for the app tier; the database
  primary sits in one region with regional read replicas, and photos/search
  index replicate asynchronously cross-region — read-heavy traffic (browsing
  listings) is fully regional, while writes (bookings) accept a small
  cross-region latency cost for consistency.
- Centralized observability (logs/metrics/traces) across all services for
  incident response and capacity planning.

## Trade-offs deliberately made for this scope
- Booking/payment consistency (e.g., preventing double-booking a date
  range) is not detailed here — it would need a locking or reservation-hold
  strategy at the database layer, which is out of scope for a take-home UI
  clone but worth flagging as the next design pass.
- Search relevance ranking and geo-radius querying are shown as a single
  "Search Service" box; a real implementation would likely separate query
  parsing from ranking/personalization.
