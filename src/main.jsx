import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  // 313. Modeling the "User" State With Redux Toolkit
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
