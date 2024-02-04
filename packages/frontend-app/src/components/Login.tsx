import {Avatar} from "@components/Avatar";
import styled from 'styled-components';

import { FitContainer } from '@components/StyledElements';
import LoginBgImage from '../assets/wallpaper/wallpaper.webp';

const WithBgImage = styled(FitContainer)`
  background-image: url(${LoginBgImage});
  background-size: cover;
  background-position: center;
`;

const WithGrassEffect = styled(FitContainer)`
backdrop-filter: blur(5px);
`;

const CenterContent = styled(FitContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function Login() {
  return (
    <WithBgImage>
      <WithGrassEffect>
        <CenterContent>
          <Avatar />
        </CenterContent>
      </WithGrassEffect>
    </WithBgImage>
  )
}
