import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './styles/global.css';
import './i18n/config';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container missing');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
