import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import 'normalize.css';

import router from './router';
import './styles/global.less';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <RouterProvider router={router} />  
);
