import { QueryClient } from '@tanstack/react-query';
import { rootRouteWithContext, Outlet } from '@tanstack/react-router';

import { FitContainer } from './components/StyledElements';

export default rootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => {
    return (
      <FitContainer>
        <Outlet />
      </FitContainer>
    );
  }
});
