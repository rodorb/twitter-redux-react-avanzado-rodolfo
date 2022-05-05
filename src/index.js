import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import storage from './utils/storage';
import { setAuthorizationHeader } from './api/client';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store';
import { Provider } from 'react-redux';
import { Root } from './components/Root';

const accessToken = storage.get('auth');
setAuthorizationHeader(accessToken);

const store = configureStore({auth:!!accessToken});

ReactDOM.render(
  <React.StrictMode>
    <Root store={store}>
        <App isInitiallyLogged={!!accessToken} />
    </Root>
  </React.StrictMode>,
  document.getElementById('root'),
);
