import styled from 'styled-components';

import { SystemIcon } from '@components/Icon';

const IconList = ['icon-wifi', 'icon-spotlight', 'icon-control-center'];

const StatusMenuWrapper = styled.section`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 100%;
`;

export function StatusMenu() {
  const WifiIconStyle = {
    fontSize: 16,
    color: '#000',
    cursor: 'pointer',
  };

  const IconListElements = IconList.map((icon, index) => {
    return (
      <SystemIcon type={icon} style={WifiIconStyle} key={index} />
    );
  });

  return (
    <StatusMenuWrapper>
      { IconListElements }
    </StatusMenuWrapper>
  )
}
