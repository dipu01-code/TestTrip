import type { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.js';

export interface AuthedRequest extends Request {
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authed = req as AuthedRequest;
  const user = (req as any).user;

  if (!user || !user.id) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  authed.user = {
    id: user.id,
    email: user.email,
    name: user.name,
  };
  next();
}

export function optionalAuth(req: Request, res: Response, next: NextFunction): void {
  const user = (req as any).user;
  if (user) {
    (req as AuthedRequest).user = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
  next();
}

export async function findOrCreateUser(
  email: string,
  name: string,
): Promise<{ id: string; email: string; name: string }> {
  let user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    user = await User.create({ email: email.toLowerCase(), name, provider: 'guest' });
  }
  return { id: user._id.toString(), email: user.email, name: user.name };
}