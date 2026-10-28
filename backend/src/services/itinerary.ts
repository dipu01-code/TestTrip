import { qlooClient } from './qlooClient.js';
import { structureItinerary, type StructuredItineraryOutput } from './llm.js';
import { generateTripSchema, type GenerateTripInput } from '../schemas/request.js';

export interface GenerateItineraryResult {
  itinerary: StructuredItineraryOutput;
  source: 'qloo' | 'demo';
  rawCount: number;
}

export async function generateItinerary(
  input: GenerateTripInput,
  signal?: AbortSignal,
): Promise<GenerateItineraryResult> {
  const parsed = generateTripSchema.parse(input);

  const queryParts: string[] = [];
  for (const interest of parsed.interests) {
    queryParts.push(interest.value);
  }
  const query = queryParts.join(' ');

  const categoriesByInterest: Record<string, string> = {
    music: 'music',
    movies: 'movies',
    food: 'food',
    art: 'arts',
    gaming: 'games',
    lifestyle: 'lifestyle',
    literature: 'books',
    sports: 'sports',
  };

  const categories = Array.from(
    new Set(parsed.interests.map((i) => categoriesByInterest[i.category] || i.category)),
  );

  const [destinations, experiences] = await Promise.all([
    qlooClient.search({
      query: parsed.destination,
      types: ['destination'],
      limit: 5,
      signal,
    }),
    qlooClient.search({
      query,
      types: ['restaurant', 'activity', 'experience'],
      categories,
      location: parsed.destination,
      limit: 20,
      signal,
    }),
  ]);

  const rawResults = [
    ...(destinations.results || []),
    ...(experiences.results || []),
  ];

  if (rawResults.length === 0) {
    throw new Error('Qloo returned no results for the selected interests and destination.');
  }

  const itinerary = await structureItinerary(
    {
      destination: parsed.destination,
      summary: parsed.summary,
      days: parsed.days,
      interests: parsed.interests,
      preferences: parsed.preferences,
      rawResults,
    },
    signal,
  );

  return {
    itinerary,
    source: 'qloo',
    rawCount: rawResults.length,
  };
}