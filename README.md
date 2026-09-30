# Local Business API

Simple Node.js monolith for local businesses (makeup artists, fashion designers, cloud kitchens).

## Run
1. Start MongoDB locally (or set `MONGO_URI` in `.env` to Atlas).
2. `npm install`
3. `npm start`  (or `npm run dev` for auto-reload)
4. Swagger UI: http://localhost:3000/api-docs

## Structure (each layer has one job)
```
routes        -> URL to controller
controllers   -> read request, send response
services      -> business rules (validation, booking logic)
repositories  -> the ONLY place that talks to the database
models        -> MongoDB schemas
middlewares   -> central error handling
docs          -> Swagger (OpenAPI) spec
```
Moving to AWS DynamoDB later = rewrite only `src/repositories` and `src/models`.

## APIs
| Method | Path | What |
|---|---|---|
| GET | /api/categories | List categories |
| POST | /api/businesses | Onboard business + services + budget |
| GET | /api/businesses | All businesses |
| GET | /api/businesses/category/:category | Businesses by category |
| GET | /api/services?category= | All services with price |
| POST | /api/customers | Create customer (no auth) |
| POST | /api/bookings | Book a service |
| GET | /api/bookings/:id | Booking status |
| PATCH | /api/bookings/:id/cancel | Cancel booking |
