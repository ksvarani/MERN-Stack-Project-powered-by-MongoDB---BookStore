import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css';
import store from './store/index.js';

createRoot(document.getElementById('root')).render(
  <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
