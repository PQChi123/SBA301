import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom"; // 1. Import BrowserRouter

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* 2. Bọc thẻ <App /> bên trong <BrowserRouter> */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);