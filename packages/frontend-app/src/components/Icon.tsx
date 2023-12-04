import { createFromIconfontCN } from '@ant-design/icons';

const Icon = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4322025_4tr5au94yg9.js',
  ],
});


export function AppleIcon() {
  return (
    <Icon type={'icon-apple'} style={{ color: '#fff', fontSize: '48px' }} />
  );
}

export default Icon;
