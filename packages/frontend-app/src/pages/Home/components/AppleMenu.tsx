import styled from 'styled-components';

import { SystemIcon } from '@components/Icon';

const AppleMenuWrapper = styled.section`
  display: inline-flex;
  align-items: center;
  height: 100%;
`;

export function AppleMenu() {
  const appleIconStyle = {
    fontSize: 16,
    color: '#000',
    cursor: 'pointer',
  };

  return (
    <AppleMenuWrapper>
      <SystemIcon type={'icon-apple'} style={appleIconStyle} />
    </AppleMenuWrapper>
  )
}
