import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkAuthorization } from './store/user-process/thunk-actions';

store.dispatch(checkAuthorization());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ToastContainer
        autoClose={false}
        position='top-center'
        theme='colored'
       />
      <App />
    </React.StrictMode>
  </Provider>,
);
