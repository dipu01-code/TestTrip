import { z } from 'zod';

export const interestCategorySchema = z.enum([
  'music',
  'movies',
  'food',
  'art',
  'gaming',
  'lifestyle',
  'literature',
  'sports',
]);

export const interestSchema = z.object({
  category: interestCategorySchema,
  value: z.string().trim().min(1).max(120),
});

export const tasteProfileSchema = z.object({
  interests: z.array(interestSchema).max(20).default([]),
  preferences: z
    .object({
      budget: z.string().trim().max(60).optional(),
      travelStyle: z.string().trim().max(60).optional(),
      pace: z.string().trim().max(60).optional(),
      groupSize: z.number().int().min(1).max(20).optional(),
      dates: z
        .object({
          start: z.string().trim().max(40).optional(),
          end: z.string().trim().max(40).optional(),
        })
        .optional(),
      destination: z.string().trim().max(120).optional(),
      avoid: z.array(z.string().trim().max(60)).max(10).optional(),
    })
    .default({}),
  onboardingCompleted: z.boolean().default(false),
});

export const generateTripSchema = z.object({
  destination: z.string().trim().min(2).max(120),
  days: z.number().int().min(1).max(14).default(7),
  summary: z.string().trim().max(400).default(''),
  interests: z.array(interestSchema).min(1, 'At least one interest is required').max(20),
  preferences: tasteProfileSchema.shape.preferences,
});

export const updateTasteProfileSchema = tasteProfileSchema.partial().omit({ interests: true }).extend({
  interests: z.array(interestSchema).max(20).optional(),
});

export const feedbackSchema = z.object({
  liked: z.array(z.string()).max(50).optional(),
  disliked: z.array(z.string()).max(50).optional(),
  notes: z.string().trim().max(1000).optional(),
});

export const saveTripSchema = z.object({
  isSaved: z.boolean(),
});

export type InterestInput = z.infer<typeof interestSchema>;
export type GenerateTripInput = z.infer<typeof generateTripSchema>;
export type TasteProfileInput = z.infer<typeof tasteProfileSchema>;