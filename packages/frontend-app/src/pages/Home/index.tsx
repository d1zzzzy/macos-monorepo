import { Route } from '@tanstack/react-router';

import rootRoute from '../../App';

export const route = new Route({
  path: '/',
  component: Home,
  getParentRoute: () => rootRoute,
});

export function Home() {
  return (
    <div>
      Home
    </div>
  )
}