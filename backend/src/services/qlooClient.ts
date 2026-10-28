import { env } from '../config/env.js';

const QLOO_BASE = 'https://api.qloo.com/v1';

export interface QlooParams {
  query?: string;
  types?: string[];
  categories?: string[];
  location?: string;
  limit?: number;
  sort?: string;
  signal?: AbortSignal;
}

export interface QlooResponse<T = unknown> {
  results?: T[];
  count?: number;
  message?: string;
}

export class QlooClient {
  private readonly apiKey: string;

  constructor() {
    this.apiKey = env.QLOO_API_KEY;
    if (!this.apiKey) {
      throw new Error('QLOO_API_KEY is not configured');
    }
  }

  async search<T = unknown>(params: QlooParams): Promise<QlooResponse<T>> {
    const url = new URL(`${QLOO_BASE}/search`);
    if (params.query) url.searchParams.set('query', params.query);
    if (params.types?.length) url.searchParams.set('types', params.types.join(','));
    if (params.categories?.length) url.searchParams.set('categories', params.categories.join(','));
    if (params.location) url.searchParams.set('location', params.location);
    if (params.limit) url.searchParams.set('limit', String(params.limit));
    if (params.sort) url.searchParams.set('sort', params.sort);

    const res = await fetch(url.toString(), {
      method: 'GET',
      signal: params.signal,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`Qloo API error ${res.status}: ${body || res.statusText}`);
    }

    return (await res.json()) as QlooResponse<T>;
  }

  async tasteSignal(params: QlooParams): Promise<QlooResponse<unknown>> {
    const url = new URL(`${QLOO_BASE}/taste/signal`);
    if (params.query) url.searchParams.set('query', params.query);
    if (params.types?.length) url.searchParams.set('types', params.types.join(','));
    if (params.categories?.length) url.searchParams.set('categories', params.categories.join(','));
    if (params.location) url.searchParams.set('location', params.location);
    if (params.limit) url.searchParams.set('limit', String(params.limit));
    if (params.sort) url.searchParams.set('sort', params.sort);

    const res = await fetch(url.toString(), {
      method: 'GET',
      signal: params.signal,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`Qloo API error ${res.status}: ${body || res.statusText}`);
    }

    return (await res.json()) as QlooResponse<unknown>;
  }
}

export const qlooClient = new QlooClient();