import {IApplication} from "@/core/System/applications/application";
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useEffect, useState, useCallback } from 'react';

import { IState } from '@/store/reducers';
import { SystemIcon } from '@components/Icon';

const DockIconSize = 40;

const PositionedElement = styled.section`
  display: flex;
  position: absolute;
  bottom: 8px;
  left: 50%;
  justify-content: center;
  align-items: center;
  padding: 10px 5px;
  gap: 10px;
  color: #fff;
  background: rgba(246, 246, 246, .36); /* Dock的背景颜色 */
  backdrop-filter: blur(5px); /* Dock的背景模糊 */
  z-index: 999;
  border-radius: 16px; /* 左上角圆角 */
  transform: translateX(-50%);
`;

const DockItem = styled.div`
  transform-origin: center;
  transition: transform .3s ease-out;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const MockInDockAppIds = ['1', '2', '3', '4', '5'];

export function Dock() {
  /* State */
  const system = useSelector((state: IState) => state.app.system);

  const [apps, setApps] = useState<IApplication[]>([]);

  const onAppClick = useCallback((app: IApplication) => {
    if (system) {
      system.runApp(app.id);
    }
  }, [system]);

  /* Elements */
  const icons = apps.map((app, index) => {
    return (
      <DockItem key={app.id}>
        <SystemIcon
          type={app.icon}
          style={{fontSize: `${DockIconSize}px`, padding: `5px`}}
          onClick={() => onAppClick(app) }
        />
      </DockItem>
    );
  });

  /* Effect */
  useEffect(() => {
    if (system) {
      const _apps = system.getApplication(MockInDockAppIds);
      if (_apps) {
        setApps(_apps);
      }
    }
  }, [system]);

  return (
    <PositionedElement>
      { icons }
    </PositionedElement>
  )
}
