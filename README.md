# TasteTrip

**TasteTrip** is an AI-powered cultural travel planner. It uses Qloo's taste intelligence to recommend destinations, restaurants, activities, and experiences based on a user's cultural interests — favorite music, movies, food, games, and more.

> Travel beyond the obvious. Discover places that match your taste.

## Architecture

```
TasteTrip/
├── backend/          # Express + TypeScript API (MongoDB Atlas, Qloo)
├── frontend/         # React + TypeScript + Vite + Tailwind + Motion
├── package.json      # root scripts
├── .env.example      # required environment variables
└── README.md
```

- **Frontend**: Vite, React 18, TypeScript, Tailwind CSS, Motion for React, Lucide React, React Router.
- **Backend**: Express, TypeScript, Mongoose (MongoDB Atlas), Zod validation, Qloo API client (server-side only).
- **Qloo API keys, LLM API keys, and MongoDB credentials are never exposed to the frontend.**

## Quick start

```bash
# 1. Copy the environment template
cp .env.example .env

# 2. Install everything
npm run install:all

# 3. Start both servers
npm run dev
```

The frontend runs on `http://localhost:5173`, the backend on `http://localhost:3001`.

## Environment variables

See `.env.example`. Required:

| Variable | Purpose |
| --- | --- |
| `PORT` | Backend port (default `3001`) |
| `NODE_ENV` | `development` / `production` |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `QLOO_API_KEY` | Qloo API key (server-side only) |
| `OPENAI_API_KEY` | Optional LLM key for itinerary structuring |
| `VITE_API_BASE_URL` | Frontend API base URL (default `http://localhost:3001`) |

## Build

```bash
npm run build:backend
npm run build:frontend
```

## Tests

```bash
npm test
```