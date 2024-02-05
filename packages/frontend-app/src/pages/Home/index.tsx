import { Route } from '@tanstack/react-router';
import styled from 'styled-components';

import LoginBgImage from '@/assets/wallpaper/night.jpg';
import { Dock } from '@pages/Home/components/Dock';
import { FitContainer } from '@components/StyledElements';

import rootRoute from '../../App';

const WithBgImage = styled(FitContainer)`
  position: relative;
  overflow: hidden;
  background-image: url(${LoginBgImage});
  background-size: cover;
  background-position: center;
`;

export const route = new Route({
  path: '/',
  component: Home,
  getParentRoute: () => rootRoute,
});

export function Home() {
  return (
    <WithBgImage>
      <Dock />
    </WithBgImage>
  )
}
