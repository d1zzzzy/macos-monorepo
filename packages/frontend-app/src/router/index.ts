import { Router, createMemoryHistory } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";

import { routeTree } from './routeTree.gen';

// const memoryHistory = createMemoryHistory({
//   initialEntries: ["/start-up"], // Pass your initial url
// });

const queryClient = new QueryClient();
const router = new Router({
  routeTree,
  defaultPreload: "intent",
  // history: memoryHistory,
  context: {
    queryClient,
  },
});

export default router;
