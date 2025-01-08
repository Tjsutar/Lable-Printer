// src/index.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./App.css"; // Optional: Global CSS file for Tailwind

// Create a root for the app
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
