import { createRootRoute, createRoute, NotFoundRoute, createRouter } from '@tanstack/react-router';
import { MainLayout } from './layouts/MainLayout.js';
import { HomePage } from './pages/Home.js';
import { PlanPage } from './pages/Plan.js';
import { AboutPage } from './pages/About.js';
import { LoginPage } from './pages/Login.js';
import { NotFoundPage } from './pages/NotFound.js';

const rootRoute = createRootRoute({
  component: MainLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const planRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/plan',
  component: PlanPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: NotFoundPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  planRoute,
  aboutRoute,
  loginRoute,
  notFoundRoute,
]);

export function createRouterInstance() {
  return createRouter({ routeTree });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouterInstance>;
  }
}