import styled from 'styled-components';
import { useRef, useMemo, useEffect } from "react";

const ProgressWrapper = styled.div`
    width: 100%;
    height: 4px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  `;
const Progress = styled.div`
    width: 0;
    height: 100%;
    background-color: #fff;
    border-radius: 2px;
    transition: width 0.3s ease-in-out;
  `;

export interface IProgressBarProps {
  // [0, 1]
  percent?: number;

  onFinished?: () => void;
}

export function ProgressBar(props: IProgressBarProps) {
  const progressRef = useRef<HTMLDivElement | null>();

  const _percent = useMemo(() => {
    return props.percent ?? 0;
  },[props]);

  const computedWidth = useMemo(() => {
    const _percent = props.percent ?? 0;

    return `${_percent * 100}%`;
  },[props]);

  useEffect(() => {
    if (!progressRef.current) {
      return;
    }
    const transitionEndHandler = () => {
      if (_percent === 1) {
        props.onFinished?.();
      }
    }

    const transitions: Record<string, string> = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    let transitionEventName = '';

    for(const t in transitions){
      if(progressRef.current.style[t as any] !== undefined ){
        transitionEventName = transitions[t];
      }
    }

    if (progressRef.current) {
      progressRef.current.addEventListener(transitionEventName, transitionEndHandler);
    }

    return () => {
      if (progressRef.current) {
        progressRef.current.removeEventListener(transitionEventName, transitionEndHandler);
      }
    }
  }, [_percent]);

  return (
    <ProgressWrapper>
      <Progress ref={ r => progressRef.current = r } style={{ width: computedWidth }} />
    </ProgressWrapper>
  )
}
