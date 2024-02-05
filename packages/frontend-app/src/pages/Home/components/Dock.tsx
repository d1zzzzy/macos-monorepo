import styled from 'styled-components';

import { SystemIcon } from '@components/Icon';

const DockIconSize = 42;
const DockIcons = ['icon-Photo', 'icon-Calculator', 'icon-FaceTime', 'icon-a-AppStore', 'icon-Monitor'];

const PositionedElement = styled.section`
  display: flex;
  position: absolute;
  bottom: 8px;
  left: 50%;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  gap: 10px;
  color: #fff;
  background: rgba(255, 255, 255, .3); /* Dock的背景颜色 */
  backdrop-filter: blur(5px); /* Dock的背景模糊 */
  z-index: 999;
  border-radius: 16px; /* 左上角圆角 */
  transform: translateX(-50%);
`;

const DockItem = styled.div`
  transform-origin: center;
  transition: transform .3s ease-in-out;
  
  &:hover {
    transform: scale(1.2);
  }
`;

export function Dock() {
  const icons = DockIcons.map((icon, index) => {
    return (
      <DockItem key={index}>
        <SystemIcon type={icon} style={{ fontSize: `${DockIconSize}px` }}></SystemIcon>
      </DockItem>
    );
  });

  return (
    <PositionedElement>
      { icons }
    </PositionedElement>
  )
}
