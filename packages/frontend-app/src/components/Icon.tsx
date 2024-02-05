import { createFromIconfontCN } from '@ant-design/icons';

const Icon = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4322025_oaz3kdwxt5.js',
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

export default Icon;
