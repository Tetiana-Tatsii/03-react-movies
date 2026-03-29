import React from "react";
import ReactDOM from "react-dom/client";
import "modern-normalize/modern-normalize.css"; // Додали цей рядок
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
