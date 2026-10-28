import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Invalid request',
      details: err.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
    });
    return;
  }

  if (err instanceof Error) {
    const status = (err as any).status ?? 500;
    if (status >= 500) {
      console.error('❌ Server error:', err);
    }
    res.status(status).json({
      error: err.message || 'Internal server error',
    });
    return;
  }

  res.status(500).json({ error: 'Internal server error' });
}