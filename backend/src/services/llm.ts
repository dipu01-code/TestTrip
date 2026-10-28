import OpenAI from 'openai';
import { env } from '../config/env.js';

let client: OpenAI | null = null;

function getClient(): OpenAI {
  if (client) return client;
  if (!env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }
  client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
  return client;
}

export interface StructuredItineraryInput {
  destination: string;
  summary: string;
  days: number;
  interests: { category: string; value: string }[];
  preferences: Record<string, unknown>;
  rawResults: unknown[];
}

export interface StructuredItineraryOutput {
  title: string;
  destination: string;
  summary: string;
  days: {
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
  }[];
  budget?: {
    estimated?: string;
    breakdown?: { category: string; amount: string }[];
  };
}

export async function structureItinerary(
  input: StructuredItineraryInput,
  signal?: AbortSignal,
): Promise<StructuredItineraryOutput> {
  const openai = getClient();

  const systemPrompt = `You are a travel itinerary structurer. You receive raw cultural-taste search results and must turn them into a coherent, day-by-day travel itinerary for a single destination. Every activity must come from the provided raw results or be a reasonable, generic placeholder clearly marked as such. Never invent cultural-match explanations that are not supported by the raw data. Return ONLY valid JSON matching the requested schema, with no extra commentary.`;

  const userPrompt = `Destination: ${input.destination}
Trip length: ${input.days} days
Summary request: ${input.summary}
User interests: ${JSON.stringify(input.interests)}
User preferences: ${JSON.stringify(input.preferences)}
Raw results from Qloo: ${JSON.stringify(input.rawResults)}

Produce a day-by-day itinerary. For each day provide a location and a list of activities. Each activity must have a unique id, name, type (activity|restaurant|experience), optional time, duration, description, matchExplanation, address, price, and url. matchExplanation should explain in one sentence why this place matches the user's taste, referencing the raw results when possible. If the raw results do not contain enough data for a full itinerary, fill remaining slots with clearly-described generic placeholders (name prefixed with "[Sample] "). Return JSON with this exact shape:
{
  "title": string,
  "destination": string,
  "summary": string,
  "days": [ { "day": number, "date"?: string, "location": string, "activities": [ {...} ] } ],
  "budget": { "estimated"?: string, "breakdown"?: [ { "category": string, "amount": string } ] }
}`;

  const completion = await openai.chat.completions.create(
    {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.4,
    },
    { signal },
  );

  const content = completion.choices[0]?.message.content;
  if (!content) {
    throw new Error('LLM returned empty response');
  }

  try {
    return JSON.parse(content) as StructuredItineraryOutput;
  } catch {
    throw new Error('LLM returned invalid JSON');
  }
}