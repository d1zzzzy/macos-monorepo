import { route as StartUpLoadingRoute } from '../pages/StartUp';
import { route as HomeRoute } from '../pages/Home';
import rootRoute from '../App';


declare module "@tanstack/react-router" {
  interface Routes {
    "/": {
      parentRoute: typeof rootRoute;
    };
    "/start-up": {
      parentRoute: typeof rootRoute;
    };
  }
}

Object.assign(StartUpLoadingRoute.options, {
  id: "/start-up",
});

Object.assign(HomeRoute.options, {
  id: "/",
});

export const routeTree = rootRoute.addChildren([
  StartUpLoadingRoute,
  HomeRoute,
]);

