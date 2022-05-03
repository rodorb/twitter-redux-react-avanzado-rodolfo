import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import storage from './utils/storage';
import { setAuthorizationHeader } from './api/client';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store';

const accessToken = storage.get('auth');
setAuthorizationHeader(accessToken);

const store = configureStore();
window.store = (store);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App isInitiallyLogged={!!accessToken} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
