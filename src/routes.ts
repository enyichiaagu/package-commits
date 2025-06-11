import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('pages/front.tsx'),
  route('package/*', 'pages/result.tsx'),
] satisfies RouteConfig;
