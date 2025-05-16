import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // ✅ Make sure this is App.js, not App.jsx
import "./styles/main.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
