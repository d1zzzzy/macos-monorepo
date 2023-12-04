import { QueryClient } from '@tanstack/react-query';
import { rootRouteWithContext, Outlet } from '@tanstack/react-router';
import { Provider } from 'react-redux';
import { ComponentProps, useEffect } from "react";

import { FitContainer } from '@/components/StyledElements';
import { useSystem } from "./hooks/useSystem";
import store from './store';

function Inject({ children }: ComponentProps<'div'>) {
 const { init } = useSystem();

  useEffect(() => {
    init();
  }, []);

  return (
    <Provider store={store}>
      { children }
    </Provider>
  );
}

export default rootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => {
    return (
      <Inject>
        <FitContainer>
          <Outlet />
        </FitContainer>
      </Inject>
    );
  }
});
