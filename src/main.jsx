import React from 'react';
import { createRoot } from "react-dom/client";
import './assets/tailwind.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Import komponen App

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);