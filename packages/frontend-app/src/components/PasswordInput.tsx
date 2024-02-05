import styled from 'styled-components';
import type { KeyboardEvent } from 'react';

import { CapsLockIcon } from '@components/Icon';

const CapsLockIconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`

const PasswordInputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 12px 0;

  input {
    width: 100%;
    height: 36px;
    line-height: 36px;
    padding: 10px 42px 10px 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    outline: none;
    box-sizing: border-box;
  }
`;

export interface PasswordInputProps {
  onEnter?: () => void;
}

export function PasswordInput({ onEnter }: PasswordInputProps) {
  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      onEnter && onEnter();
    }
  }

  return (
    <PasswordInputWrapper>
      <input type="password" onKeyUp={handleKeyUp} />

      <CapsLockIconWrapper>
        <CapsLockIcon />
      </CapsLockIconWrapper>
    </PasswordInputWrapper>
  );
}
