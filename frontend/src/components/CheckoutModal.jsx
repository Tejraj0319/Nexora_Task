
import React, { useState } from "react";
import { checkout } from "../api";

export default function CheckoutModal({ cartData, onClose }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ✅ Important fix — send in expected structure
      const res = await checkout({
        cartItems: cartData.cart, // backend expects this key
        customer: form,           // optional, for name/email info
      });
      setReceipt(res.data);
    } catch (err) {
      console.error("Checkout failed:", err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (receipt) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl w-80 text-center shadow-lg">
          <h2 className="text-xl font-bold mb-2 text-green-600">
            Checkout Successful!
          </h2>
          <p>{receipt.message}</p>
          <p className="font-semibold mt-2">Total: ${receipt.total}</p>
          <p className="text-gray-500 text-sm mt-1">
            {new Date(receipt.timestamp).toLocaleString()}
          </p>
          <button
            onClick={onClose}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-80 shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">Checkout</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full mb-3 border rounded p-2"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full mb-3 border rounded p-2"
          required
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
