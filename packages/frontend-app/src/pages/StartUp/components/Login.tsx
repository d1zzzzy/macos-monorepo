import {Avatar} from "@components/Avatar";
import {PasswordInput} from "@components/PasswordInput";
import styled from 'styled-components';

import { FitContainer } from '@components/StyledElements';
import LoginBgImage from '../../../assets/wallpaper/wallpaper.webp';

const WithBgImage = styled(FitContainer)`
  background-image: url(${LoginBgImage});
  background-size: cover;
  background-position: center;
`;

const WithGrassEffect = styled(FitContainer)`
backdrop-filter: blur(5px);
`;

const AlignCenter = styled(FitContainer)`
  display: flex;
  align-items: center;
`;

const CenterContent = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.section`
  margin: 0 auto;
  width: 200px;
`;

export interface LoginProps {
  onLoginSuccess?: () => void,
}

export function Login({ onLoginSuccess }: LoginProps) {
  const handleEnterEvent = () => {
    onLoginSuccess && onLoginSuccess();
  }

  return (
    <WithBgImage>
      <WithGrassEffect>
        <AlignCenter>
          <Content>
            <CenterContent>
              <Avatar />
            </CenterContent>
            <CenterContent>
              <PasswordInput onEnter={handleEnterEvent} />
            </CenterContent>
          </Content>
        </AlignCenter>
      </WithGrassEffect>
    </WithBgImage>
  )
}
