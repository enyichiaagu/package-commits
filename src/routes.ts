import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('package/*', 'routes/result.tsx'),
] satisfies RouteConfig;
