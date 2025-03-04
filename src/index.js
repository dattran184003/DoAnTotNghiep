import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DarkModeContextProvider } from './Admin/Layout/context/darkModeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
);

