import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { connectMongo } from './db/connection.js';
import { healthRouter } from './routes/health.js';
import { authRouter } from './routes/auth.js';
import { tasteRouter } from './routes/taste.js';
import { tripsRouter } from './routes/trips.js';
import { errorHandler } from './middleware/error.js';

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.NODE_ENV === 'production' ? false : true,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '1mb' }));

  app.get('/health', (_req, res) => res.json({ ok: true }));

  app.use('/api/health', healthRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/taste', tasteRouter);
  app.use('/api/trips', tripsRouter);

  app.use(errorHandler);

  return app;
}

async function main() {
  await connectMongo();
  const app = createApp();
  app.listen(env.PORT, () => {
    console.log(`🚀 TasteTrip backend running on http://localhost:${env.PORT}`);
  });
}

if (import.meta.url === `file://${process.argv[1]}` || process.env.NODE_ENV !== 'test') {
  main().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}