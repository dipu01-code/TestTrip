import { endpoints, type ApiError } from '@/lib/api/endpoints.js';
import type { User } from '@/lib/api/types.js';

const TOKEN_KEY = 'tastetrip_guest_token';

interface AuthState {
  user: User | null;
  token: string | null;
}

let state: AuthState = {
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null,
};

const listeners = new Set<(s: AuthState) => void>();

function notify() {
  for (const l of listeners) l(state);
}

export function subscribeAuth(l: (s: AuthState) => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function getAuthState(): AuthState {
  return state;
}

export function setAuth(user: User | null, token: string | null) {
  state = { user, token };
  if (typeof window !== 'undefined') {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  }
  notify();
}

export async function loginAsGuest(email: string, name: string): Promise<User> {
  const res = await endpoints.auth.guest({ email, name });
  setAuth(res.user, res.user.id);
  return res.user;
}

export function logout() {
  setAuth(null, null);
}

export function getAuthError(err: unknown): string {
  if (err instanceof Error) return err.message;
  return 'Something went wrong.';
}

export type { ApiError };