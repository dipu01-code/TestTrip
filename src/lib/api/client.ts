import axios, { type AxiosInstance, type AxiosError } from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export function setApiToken(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

export function getApiError(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const ax = err as AxiosError<{ error?: string; message?: string }>;
    if (ax.response?.data?.error) return ax.response.data.error;
    if (ax.response?.data?.message) return ax.response.data.message;
    if (ax.code === 'ECONNABORTED') return 'Request timed out. Please try again.';
    if (ax.code === 'ERR_NETWORK') return 'Could not connect to the server. Check your connection.';
    return ax.message || 'Something went wrong.';
  }
  if (err instanceof Error) return err.message;
  return 'Something went wrong.';
}

export function isNetworkError(err: unknown): boolean {
  return axios.isAxiosError(err) && err.code === 'ERR_NETWORK';
}