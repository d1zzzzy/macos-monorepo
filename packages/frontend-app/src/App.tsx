import { QueryClient } from '@tanstack/react-query';
import { rootRouteWithContext, Outlet } from '@tanstack/react-router';


export default rootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => {
    return (
      <>
        <Outlet />
      </>
    );
  }
});
