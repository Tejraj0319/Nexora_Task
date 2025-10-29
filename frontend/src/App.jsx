import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gray-800 text-white p-4 flex justify-between">
        <Link to="/" className="font-bold">
          Nexora Shop
        </Link>
        <Link to="/cart" className="hover:underline">
          Cart
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}
