import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/auth.jsx";
import { SearchProvider } from "./context/Search.jsx";
import { CartProvider } from "./context/cart.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <Router>
        <App />
        </Router>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);
