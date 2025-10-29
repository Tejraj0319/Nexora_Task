import React, { useEffect, useState } from "react";
import { getProducts, addToCart } from "../api";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleAddToCart = async (productId) => {
    await addToCart({ productId, qty: 1 });
    alert("Added to cart!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">Shop Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-[90%] md:w-[80%] max-w-6xl">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col items-center"
          >
            <div className="w-full h-56 flex items-center justify-center overflow-hidden rounded-xl bg-gray-50 mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="object-contain w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>

            <h2 className="text-xl font-semibold text-center text-gray-900">{product.name}</h2>
            <p className="text-gray-600 text-lg font-medium mt-1 text-center">${product.price}</p>

            <button
              onClick={() => handleAddToCart(product._id)}
              className="mt-5 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full shadow-lg
                         hover:shadow-xl hover:from-blue-700 hover:to-blue-500 transform hover:-translate-y-1 hover:scale-105
                         transition-all duration-300 font-semibold flex items-center justify-center gap-2"
            >
              Add to Cart
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M9 21h6"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
