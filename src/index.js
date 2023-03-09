import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
// fonte :https://gist.github.com/ANDREHORMAN1994/e299f113e3e750276e8da0a8982b59f4
