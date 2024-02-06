import { ComponentProps } from 'react';

import styled from 'styled-components';

export function ApplicationFrame(props: ComponentProps<'div'>) {
  const Wrapper = styled.div`
    position: relative;
    display: inline-grid;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
  `;

  return (
    <Wrapper>
      ApplicationFrame
    </Wrapper>
  )
}
