import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { MotionConfig, LazyMotion, m } from 'motion/react';
import { queryClient } from './lib/queryClient.js';
import { createRouterInstance } from './router.js';
import './styles/globals.css';

const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const router = createRouterInstance();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion={reduceMotion ? 'always' : 'never'}>
        <RouterProvider router={router} />
      </MotionConfig>
    </QueryClientProvider>
  </React.StrictMode>,
);