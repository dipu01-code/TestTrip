import { Schema, model, type Document, type Types } from 'mongoose';

export interface IDayItinerary {
  day: number;
  date?: string;
  location: string;
  activities: {
    id: string;
    name: string;
    type: 'activity' | 'restaurant' | 'experience';
    time?: string;
    duration?: string;
    description?: string;
    matchExplanation?: string;
    address?: string;
    price?: string;
    url?: string;
  }[];
}

export interface ITrip extends Document {
  userId: Types.ObjectId;
  title: string;
  destination: string;
  summary: string;
  days: IDayItinerary[];
  budget?: {
    estimated?: string;
    breakdown?: { category: string; amount: string }[];
  };
  source: 'qloo' | 'demo' | 'llm';
  tasteSnapshot: {
    interests: { category: string; value: string }[];
    preferences: Record<string, unknown>;
  };
  isSaved: boolean;
  feedback?: {
    liked?: string[];
    disliked?: string[];
    notes?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const tripSchema = new Schema<ITrip>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    summary: { type: String, trim: true, default: '' },
    days: {
      type: [
        {
          day: { type: Number, required: true },
          date: { type: String, trim: true },
          location: { type: String, required: true, trim: true },
          activities: {
            type: [
              {
                id: { type: String, required: true },
                name: { type: String, required: true, trim: true },
                type: {
                  type: String,
                  enum: ['activity', 'restaurant', 'experience'],
                  required: true,
                },
                time: { type: String, trim: true },
                duration: { type: String, trim: true },
                description: { type: String, trim: true },
                matchExplanation: { type: String, trim: true },
                address: { type: String, trim: true },
                price: { type: String, trim: true },
                url: { type: String, trim: true },
              },
            ],
            default: [],
          },
        },
      ],
      default: [],
    },
    budget: {
      type: {
        estimated: { type: String, trim: true },
        breakdown: {
          type: [
            {
              category: { type: String, required: true, trim: true },
              amount: { type: String, required: true, trim: true },
            },
          ],
          default: [],
        },
      },
      default: {},
    },
    source: { type: String, enum: ['qloo', 'demo', 'llm'], default: 'llm' },
    tasteSnapshot: {
      type: {
        interests: {
          type: [
            {
              category: { type: String, required: true, trim: true },
              value: { type: String, required: true, trim: true },
            },
          ],
          default: [],
        },
        preferences: { type: Schema.Types.Mixed, default: {} },
      },
      required: true,
    },
    isSaved: { type: Boolean, default: false },
    feedback: {
      type: {
        liked: { type: [String], default: [] },
        disliked: { type: [String], default: [] },
        notes: { type: String, trim: true },
      },
      default: {},
    },
  },
  { timestamps: true },
);

export const Trip = model<ITrip>('Trip', tripSchema);