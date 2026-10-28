import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { MainLayout } from './layouts/MainLayout.js';
import { HomePage } from './pages/Home.js';
import { PlanPage } from './pages/Plan.js';
import { AboutPage } from './pages/About.js';
import { LoginPage } from './pages/Login.js';
import {NotFoundPage} from './pages/NotFound.js';

const rootRoute = createRootRoute({
  component: MainLayout,
});

const indexRoute = createRoute({
  path: '/',
  component: HomePage,
});

const planRoute = createRoute({
  path: '/plan',
  component: PlanPage,
});

const aboutRoute = createRoute({
  path: '/about',
  component: AboutPage,
});

const loginRoute = createRoute({
  path: '/login',
  component: LoginPage,
});

const notFoundRoute = createRoute({
  path: '*',
  component: NotFoundPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  planRoute,
  aboutRoute,
  loginRoute,
  notFoundRoute,
]);

export function createRouter() {
  return createRouter({ routeTree });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}