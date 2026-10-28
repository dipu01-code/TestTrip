import { Router } from 'express';
import { isMongoConnected } from '../db/connection.js';

export const healthRouter = Router();

healthRouter.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    mongo: isMongoConnected(),
    uptime: process.uptime(),
    env: process.env.NODE_ENV,
  });
});