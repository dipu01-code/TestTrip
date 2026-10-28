import { Router } from 'express';
import { findOrCreateUser } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/async.js';
import { z } from 'zod';

export const authRouter = Router();

const guestSchema = z.object({
  email: z.string().email('A valid email is required'),
  name: z.string().trim().min(1).max(80),
});

// POST /api/auth/guest — create or resume a guest session
authRouter.post(
  '/guest',
  asyncHandler(async (req, res) => {
    const { email, name } = guestSchema.parse(req.body);
    const user = await findOrCreateUser(email, name);
    res.json({ user });
  }),
);