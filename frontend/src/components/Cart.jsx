import React, { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../api";

export default function Cart({ onCheckout }) {
  const [cartData, setCartData] = useState({ cart: [], total: 0 });

  const loadCart = async () => {
    const res = await getCart();
    setCartData(res.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = async (id) => {
    await removeFromCart(id);
    loadCart();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h2>

      {cartData.cart.length === 0 ? (
        <p className="text-gray-600 text-lg">No items in cart.</p>
      ) : (
        <div className="w-full max-w-3xl flex flex-col gap-4">
          {cartData.cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src={item.productId?.image}
                    alt={item.productId?.name}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.productId?.name}</h3>
                  <p className="text-gray-600">Qty: {item.qty}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-2 sm:mt-0">
                <span className="font-medium text-gray-800">
                  ${(item.productId?.price * item.qty).toFixed(2)}
                </span>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-500 hover:text-red-700 font-semibold transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-2xl shadow-md">
            <span className="text-xl font-bold text-gray-900">
              Total: ${cartData.total.toFixed(2)}
            </span>
            <button
              onClick={() => onCheckout(cartData)}
              className="mt-4 sm:mt-0 bg-green-600 text-white px-6 py-3 rounded-full shadow hover:bg-green-700 hover:shadow-lg transition-all font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
