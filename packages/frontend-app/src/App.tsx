import { QueryClient } from '@tanstack/react-query';
import { rootRouteWithContext, Outlet } from '@tanstack/react-router';
import { Provider } from 'react-redux';
import {ComponentProps, useEffect, useLayoutEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import { FitContainer } from './components/StyledElements';
import store from './store';
import {useSystem} from "./hooks/useSystem";

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
