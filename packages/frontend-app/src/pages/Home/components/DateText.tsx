import dayjs from 'dayjs';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

const format = 'ddd MMM D h:m A';

const FontTime = styled.time`
  font-size: 14px;
`;

export function DateText() {
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);
  const [showText, setShowText] = useState(dayjs().format(format));

  useEffect(() => {
    const _timer  = setInterval(() => {
      setShowText(dayjs().format(format));
    }, 1000);

    setTimer(_timer);

    return () => {
      timer && clearInterval(timer);
    }
  }, []);

  return (
    <FontTime>
      { showText }
    </FontTime>
  )
}
