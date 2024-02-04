import {EvtNames} from "@/core/System/constants/events";
import { Route } from '@tanstack/react-router';
import { useSelector } from 'react-redux';
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useNavigate } from '@tanstack/react-router'
import styled from 'styled-components';

import rootRoute from '@/App';
import Icon, { AppleIcon } from '@components/Icon';
import { FitContainer } from '@components/StyledElements';
import { ProgressBar } from '@components/ProgressBar';
import { Login } from '@components/Login';
import { black } from '@/styles/color';
import { IState } from '@/store/reducers';

export const route = new Route({
  path: '/start-up',
  component: StartUp,
  getParentRoute: () => rootRoute,
});

const Loading = styled(FitContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${black};
`;

const Content = styled.div`

`;

export function StartUp() {
  const [loadingPercent, setLoadingPercent] = useState(30);

  const navigate = useNavigate({ from: '/start-up' });
  const system = useSelector((state: IState) => state.app.system);

  const [isOff, setIsOff] = useState(() => system?.isOff ?? true);
  const [isStarting, setIsStarting] = useState(() => system?.isStarting ?? false);
  const [isNotLogin, setIsNotLogin] = useState(() => system?.isNotLoginIn ?? false);

  // 系统启动前的回调
  const onSystemLaunchBefore = useCallback(() => {
    // 虚拟进度条
    setLoadingPercent(.3);
  }, []);

  // 系统启动完成的回调
  const onSystemLaunched = useCallback(() => {
    setLoadingPercent(1);
  }, []);

  const onProgressFinished = useCallback(() => {
    // navigate({to: '/'}).then(r => {});
  }, []);

  const updateStatusRef = useCallback(() => {
    if (system) {
      setIsOff(system.isOff);
      setIsStarting(system.isStarting);
      setIsNotLogin(system.isNotLoginIn);
    }
  }, [system]);

  useEffect(() => {
    if (system) {
      system.subscribe(EvtNames.STATE_CHANGE, updateStatusRef);

      system?.start({
        onBefore: onSystemLaunchBefore,
        onSucceed: onSystemLaunched,
      });
    }

    return () => {
      system && system.unsubscribe(EvtNames.STATE_CHANGE, updateStatusRef);
    }
  }, [system]);

  const ContentPlaceholder = useCallback(() => {

    if (isOff) {
      return (
        <Loading>
          <Content />
        </Loading>
      )
    }

    if (isStarting) {
      return (
        <Loading>
          <Content>
            <AppleIcon />

            <ProgressBar percent={loadingPercent} onFinished={onProgressFinished} />
          </Content>
        </Loading>
      );
    }

    if (isNotLogin) {
      return (
        <FitContainer>
          <Login />
        </FitContainer>
      )
    }
  }, [isOff, isStarting, isNotLogin, loadingPercent, onProgressFinished]);

  return (
    <FitContainer>
      { ContentPlaceholder() }
    </FitContainer>
  )
}
