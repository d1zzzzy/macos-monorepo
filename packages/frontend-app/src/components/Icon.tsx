import { ComponentProps } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const Icon = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4322025_r8faz8ygjh.js',
  ],
});


export function AppleIcon() {
  return (
    <Icon type={'icon-apple'} style={{ color: '#fff', fontSize: '48px' }} />
  );
}

export function CapsLockIcon() {
  return (
    <Icon type={'icon-caps-lock'} style={{ fontSize: '24px' }} />
  );
}

export function PhotoIcon(props: ComponentProps<'div'>) {
  return (
    <Icon { ...props } type={'icon-Photo'} />
  );
}

export function CalculatorIcon(props: ComponentProps<'div'>) {
  return (
    <Icon { ...props } type={'icon-Calculator'} />
  );
}

export function SystemIcon(props: ComponentProps<'div'> & { type: string }) {
  return (
    <Icon { ...props } type={props.type} />
  );
}

export default Icon;
