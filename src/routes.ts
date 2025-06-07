import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  route('', './pages/front.jsx'),
  route('package/*?', './pages/result.jsx'),
] satisfies RouteConfig;
