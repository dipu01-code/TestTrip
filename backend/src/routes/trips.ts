import { Router } from 'express';
import { Trip } from '../models/trip.js';
import { TasteProfile } from '../models/tasteProfile.js';
import { generateItinerary } from '../services/itinerary.js';
import { generateTripSchema, feedbackSchema, saveTripSchema } from '../schemas/request.js';
import { asyncHandler } from '../middleware/async.js';

export const tripsRouter = Router();

// POST /api/trips/generate
tripsRouter.post(
  '/generate',
  asyncHandler(async (req, res) => {
    const input = generateTripSchema.parse(req.body);
    const abort = new AbortController();
    req.on('close', () => abort.abort());

    const { itinerary, source, rawCount } = await generateItinerary(input, abort.signal);

    const trip = await Trip.create({
      userId: req.user.id,
      title: itinerary.title || `${itinerary.destination} trip`,
      destination: itinerary.destination,
      summary: itinerary.summary,
      days: itinerary.days,
      budget: itinerary.budget,
      source,
      tasteSnapshot: {
        interests: input.interests,
        preferences: input.preferences,
      },
      isSaved: false,
    });

    res.json({
      trip: trip.toObject(),
      source,
      rawCount,
    });
  }),
);

// GET /api/trips
tripsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const trips = await Trip.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .lean();
    res.json({ trips });
  }),
);

// GET /api/trips/:id
tripsRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const trip = await Trip.findOne({ _id: req.params.id, userId: req.user.id }).lean();
    if (!trip) {
      res.status(404).json({ error: 'Trip not found' });
      return;
    }
    res.json({ trip });
  }),
);

// PATCH /api/trips/:id
tripsRouter.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const trip = await Trip.findOne({ _id: req.params.id, userId: req.user.id });
    if (!trip) {
      res.status(404).json({ error: 'Trip not found' });
      return;
    }

    const { isSaved } = saveTripSchema.parse(req.body);
    trip.isSaved = isSaved;
    await trip.save();
    res.json({ trip: trip.toObject() });
  }),
);

// POST /api/trips/:id/feedback
tripsRouter.post(
  '/:id/feedback',
  asyncHandler(async (req, res) => {
    const trip = await Trip.findOne({ _id: req.params.id, userId: req.user.id });
    if (!trip) {
      res.status(404).json({ error: 'Trip not found' });
      return;
    }

    const feedback = feedbackSchema.parse(req.body);
    trip.feedback = {
      liked: feedback.liked ?? trip.feedback?.liked ?? [],
      disliked: feedback.disliked ?? trip.feedback?.disliked ?? [],
      notes: feedback.notes ?? trip.feedback?.notes ?? '',
    };
    await trip.save();
    res.json({ trip: trip.toObject() });
  }),
);