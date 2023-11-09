import { Route } from '@tanstack/react-router';

import rootRoute from '../../App';

export const route = new Route({
  path: '/start-up',
  component: StartUp,
  getParentRoute: () => rootRoute,
});

export function StartUp() {
  return (
    <div>
      Loading
    </div>
  )
}