import { api, getApiError, isNetworkError } from './client.js';
import type {
  User,
  TasteProfile,
  Trip,
  GenerateTripRequest,
  GenerateTripResponse,
  UpdateTasteProfileRequest,
  UpdateTasteProfileResponse,
  SaveTripResponse,
  FeedbackRequest,
  GuestLoginRequest,
  GuestLoginResponse,
  ApiError,
} from './types.js';

export class ApiError extends Error {
  status?: number;
  isNetwork: boolean;
  details?: ApiError['details'];

  constructor(message: string, opts: { status?: number; isNetwork?: boolean; details?: ApiError['details'] } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = opts.status;
    this.isNetwork = opts.isNetwork ?? false;
    this.details = opts.details;
  }
}

function toApiError(err: unknown, fallback = 'Something went wrong.'): ApiError {
  if (err instanceof ApiError) return err;
  const message = getApiError(err);
  return new ApiError(message, {
    isNetwork: isNetworkError(err),
  });
}

export const endpoints = {
  auth: {
    guest: (data: GuestLoginRequest) =>
      api.post<GuestLoginResponse>('/api/auth/guest', data).then((r) => r.data),
  },
  taste: {
    get: () => api.get<{ profile: TasteProfile }>('/api/taste').then((r) => r.data.profile),
    update: (data: UpdateTasteProfileRequest) =>
      api.put<UpdateTasteProfileResponse>('/api/taste', data).then((r) => r.data.profile),
    patch: (data: UpdateTasteProfileRequest) =>
      api.patch<UpdateTasteProfileResponse>('/api/taste', data).then((r) => r.data.profile),
  },
  trips: {
    generate: (data: GenerateTripRequest) =>
      api
        .post<GenerateTripResponse>('/api/trips/generate', data)
        .then((r) => r.data),
    list: () => api.get<{ trips: Trip[] }>('/api/trips').then((r) => r.data.trips),
    get: (id: string) => api.get<{ trip: Trip }>(`/api/trips/${id}`).then((r) => r.data.trip),
    save: (id: string, isSaved: boolean) =>
      api.patch<SaveTripResponse>(`/api/trips/${id}`, { isSaved }).then((r) => r.data.trip),
    feedback: (id: string, data: FeedbackRequest) =>
      api.post<{ trip: Trip }>(`/api/trips/${id}/feedback`, data).then((r) => r.data.trip),
  },
};

export function wrap<T>(promise: Promise<T>): Promise<T> {
  return promise.catch((err) => {
    throw toApiError(err);
  });
}

export type { ApiError as ApiErrorType };