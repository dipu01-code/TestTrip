import { Schema, model, type Document, type Types } from 'mongoose';

export type InterestCategory =
  | 'music'
  | 'movies'
  | 'food'
  | 'art'
  | 'gaming'
  | 'lifestyle'
  | 'literature'
  | 'sports';

export interface IInterest {
  category: InterestCategory;
  value: string;
}

export interface ITasteProfile extends Document {
  userId: Types.ObjectId;
  interests: IInterest[];
  preferences: {
    budget?: string;
    travelStyle?: string;
    pace?: string;
    groupSize?: number;
    dates?: { start?: string; end?: string };
    destination?: string;
    avoid?: string[];
  };
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const tasteProfileSchema = new Schema<ITasteProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    interests: {
      type: [
        {
          category: {
            type: String,
            enum: ['music', 'movies', 'food', 'art', 'gaming', 'lifestyle', 'literature', 'sports'],
            required: true,
          },
          value: { type: String, required: true, trim: true },
        },
      ],
      default: [],
    },
    preferences: {
      type: {
        budget: { type: String, trim: true },
        travelStyle: { type: String, trim: true },
        pace: { type: String, trim: true },
        groupSize: { type: Number },
        dates: {
          type: {
            start: { type: String, trim: true },
            end: { type: String, trim: true },
          },
        },
        destination: { type: String, trim: true },
        avoid: { type: [String], default: [] },
      },
      default: {},
    },
    onboardingCompleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const TasteProfile = model<ITasteProfile>('TasteProfile', tasteProfileSchema);