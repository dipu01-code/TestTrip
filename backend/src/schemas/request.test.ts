import { describe, it, expect } from 'vitest';
import { generateTripSchema, interestSchema, tasteProfileSchema } from './request.js';

describe('request schemas', () => {
  it('parses a valid generate trip request', () => {
    const result = generateTripSchema.parse({
      destination: 'Tokyo',
      days: 5,
      summary: 'A food-focused trip',
      interests: [{ category: 'food', value: 'sushi' }],
      preferences: { budget: 'mid', travelStyle: 'cultural' },
    });
    expect(result.destination).toBe('Tokyo');
    expect(result.days).toBe(5);
  });

  it('rejects empty interests', () => {
    const result = generateTripSchema.safeParse({
      destination: 'Tokyo',
      days: 5,
      interests: [],
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid category', () => {
    const result = interestSchema.safeParse({ category: 'crypto', value: 'bitcoin' });
    expect(result.success).toBe(false);
  });

  it('applies defaults for taste profile', () => {
    const result = tasteProfileSchema.parse({ interests: [], preferences: {} });
    expect(result.onboardingCompleted).toBe(false);
  });
});