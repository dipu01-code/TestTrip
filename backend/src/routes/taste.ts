import { Router } from 'express';
import { TasteProfile } from '../models/tasteProfile.js';
import { tasteProfileSchema, updateTasteProfileSchema } from '../schemas/request.js';
import { asyncHandler } from '../middleware/async.js';

export const tasteRouter = Router();

// GET /api/taste
tasteRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    let profile = await TasteProfile.findOne({ userId: req.user.id });
    if (!profile) {
      profile = await TasteProfile.create({
        userId: req.user.id,
        interests: [],
        preferences: {},
        onboardingCompleted: false,
      });
    }
    res.json({ profile: profile.toObject() });
  }),
);

// PUT /api/taste
tasteRouter.put(
  '/',
  asyncHandler(async (req, res) => {
    const input = tasteProfileSchema.parse(req.body);
    const profile = await TasteProfile.findOneAndUpdate(
      { userId: req.user.id },
      {
        $set: {
          interests: input.interests,
          preferences: input.preferences,
          onboardingCompleted: input.onboardingCompleted,
        },
      },
      { new: true, upsert: true },
    );
    res.json({ profile: profile.toObject() });
  }),
);

// PATCH /api/taste
tasteRouter.patch(
  '/',
  asyncHandler(async (req, res) => {
    const input = updateTasteProfileSchema.parse(req.body);
    const update: Record<string, unknown> = {};
    if (input.interests !== undefined) update.interests = input.interests;
    if (input.preferences !== undefined) update.preferences = input.preferences;
    if (input.onboardingCompleted !== undefined)
      update.onboardingCompleted = input.onboardingCompleted;

    const profile = await TasteProfile.findOneAndUpdate(
      { userId: req.user.id },
      { $set: update },
      { new: true, upsert: true },
    );
    res.json({ profile: profile.toObject() });
  }),
);