import { Route } from '@tanstack/react-router';
import { useSelector } from "react-redux";
import styled from 'styled-components';

import rootRoute from '../../App';
import Icon from '../../components/Icon';
import { FitContainer } from '../../components/StyledElements';
import { black } from '../../styles/color';
import { IState } from "../../store/reducers";
import {useEffect} from "react";

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
  const system = useSelector((state: IState) => state.app.system);

  useEffect(() => {
    console.log('==============>', system)
  }, [system]);

  return (
    <Loading>
      <Content>
        <Icon type={'icon-apple'} style={{ color: '#fff', fontSize: '48px' }} />
      </Content>
    </Loading>
  )
}
