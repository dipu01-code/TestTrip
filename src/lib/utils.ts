import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return '';
  return format(d, 'EEE, MMM d');
}

export function formatPrice(amount: string | number): string {
  if (typeof amount === 'number') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return amount;
}

export function truncate(str: string, n = 120): string {
  if (str.length <= n) return str;
  return str.slice(0, n - 1).trimEnd() + '…';
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const CATEGORY_LABELS: Record<string, string> = {
  music: 'Music',
  movies: 'Movies & TV',
  food: 'Food',
  art: 'Art & Culture',
  gaming: 'Gaming',
  lifestyle: 'Lifestyle',
  literature: 'Literature',
  sports: 'Sports',
};

export const CATEGORY_ICONS: Record<string, string> = {
  music: '🎵',
  movies: '🎬',
  food: '🍜',
  art: '🎨',
  gaming: '🎮',
  lifestyle: '✦',
  literature: '📚',
  sports: '⚽',
};

export const DEMO_DESTINATIONS = [
  {
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    description: 'A city where ancient shrines sit beside neon arcades — a perfect match for music lovers and food explorers alike.',
    tags: ['Music', 'Food', 'Gaming'],
    match: 94,
  },
  {
    name: 'Kyoto',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1493971509181-5b5f4b7d4b7d?auto=format&fit=crop&w=1200&q=80',
    description: 'Quiet temples, tea ceremonies, and seasonal gardens for the culturally curious.',
    tags: ['Art & Culture', 'Literature'],
    match: 91,
  },
  {
    name: 'Seoul',
    country: 'South Korea',
    image: 'https://images.unsplash.com/photo-1517153654492-7e7e6c7316d9?auto=format&fit=crop&w=1200&q=80',
    description: 'K-hip-hop alleys, Michelin-starred street food, and design-forward neighborhoods.',
    tags: ['Music', 'Food', 'Gaming'],
    match: 88,
  },
  {
    name: 'Lisbon',
    country: 'Portugal',
    image: 'https://images.unsplash.com/photo-1555166906-799da80d1d6b?auto=format&fit=crop&w=1200&q=80',
    description: 'Fado nights, pastel de nata, and hilltop views that feel like a film still.',
    tags: ['Music', 'Food', 'Art & Culture'],
    match: 86,
  },
  {
    name: 'Barcelona',
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1539037073928-8b59b8d6d05f?auto=format&fit=crop&w=1200&q=80',
    description: 'Gaudí's architecture meets beachside tapas bars and late-night jazz.',
    tags: ['Art & Culture', 'Food', 'Music'],
    match: 84,
  },
  {
    name: 'Mexico City',
    country: 'Mexico',
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=1200&q=80',
    description: 'A mural-laden metropolis where every market tells a story.',
    tags: ['Art & Culture', 'Food', 'Lifestyle'],
    match: 82,
  },
];