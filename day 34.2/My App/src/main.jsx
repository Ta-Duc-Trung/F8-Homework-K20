// Điểm khởi động của toàn bộ app React.
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // BrowserRouter: bật tính năng routing bằng History API cho toàn bộ app
  <BrowserRouter>
    <App />
  </BrowserRouter>
);