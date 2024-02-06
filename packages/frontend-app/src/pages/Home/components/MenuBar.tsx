import {StatusMenu} from "@pages/Home/components/StatusMenu";
import styled from 'styled-components';

import { AppleMenu } from '@pages/Home/components/AppleMenu';
import { DateText } from './DateText';

const MenuBarWrapper = styled.section`
  position: fixed;
  display: flex;
  justify-content: space-between;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 8px;
  height: 24px;
  background-color: rgba(255, 255, 255, .5);
  box-sizing: border-box;
`;

export function MenuBar() {
  return (
    <MenuBarWrapper>
      <section className="left">
        <AppleMenu />
      </section>

      <section className="right align-center gap-10">
        <StatusMenu />
        <DateText />
      </section>
    </MenuBarWrapper>
  )
}
