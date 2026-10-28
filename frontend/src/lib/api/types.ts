export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Interest {
  category: InterestCategory;
  value: string;
}

export type InterestCategory =
  | 'music'
  | 'movies'
  | 'food'
  | 'art'
  | 'gaming'
  | 'lifestyle'
  | 'literature'
  | 'sports';

export interface TastePreferences {
  budget?: string;
  travelStyle?: string;
  pace?: string;
  groupSize?: number;
  dates?: { start?: string; end?: string };
  destination?: string;
  avoid?: string[];
}

export interface TasteProfile {
  id: string;
  interests: Interest[];
  preferences: TastePreferences;
  onboardingCompleted: boolean;
}

export interface DayItinerary {
  day: number;
  date?: string;
  location: string;
  activities: Activity[];
}

export interface Activity {
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
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  summary: string;
  days: DayItinerary[];
  budget?: { estimated?: string; breakdown?: { category: string; amount: string }[] };
  source: 'qloo' | 'demo' | 'llm';
  isSaved: boolean;
  feedback?: { liked?: string[]; disliked?: string[]; notes?: string };
  createdAt: string;
}

export interface GenerateTripRequest {
  destination: string;
  days: number;
  summary: string;
  interests: Interest[];
  preferences: TastePreferences;
}

export interface GenerateTripResponse {
  trip: Trip;
  source: 'qloo' | 'demo';
  rawCount: number;
}

export interface UpdateTasteProfileRequest {
  interests?: Interest[];
  preferences?: TastePreferences;
  onboardingCompleted?: boolean;
}

export interface UpdateTasteProfileResponse {
  profile: TasteProfile;
}

export interface SaveTripResponse {
  trip: Trip;
}

export interface FeedbackRequest {
  liked?: string[];
  disliked?: string[];
  notes?: string;
}

export interface GuestLoginRequest {
  email: string;
  name: string;
}

export interface GuestLoginResponse {
  user: User;
}

export interface ApiError {
  error: string;
  details?: { path: string; message: string }[];
}