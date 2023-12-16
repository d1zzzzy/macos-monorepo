import styled from "styled-components";

import { FitContainer } from "@components/StyledElements";
import LoginBgImage from '../assets/wallpaper/wallpaper.webp';

const WithBgImage = styled(FitContainer)`
  background-image: url(${LoginBgImage});
  background-size: cover;
  background-position: center;
`;


export function Login() {
  return (
    <WithBgImage>
      xxxx
    </WithBgImage>
  )
}
