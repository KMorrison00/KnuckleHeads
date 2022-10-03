import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './GameStylesheet.css';
import Game from './Game';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
      <BrowserRouter>
        <Game />
      </BrowserRouter>
  // </React.StrictMode>
);

