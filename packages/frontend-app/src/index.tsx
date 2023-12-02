import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { RouterProvider } from '@tanstack/react-router';
import 'normalize.css';

import router from './router';
import store from './store/index';
import './styles/global.less';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
