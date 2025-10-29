import React, { useState } from "react";
import Cart from "../components/Cart";
import CheckoutModal from "../components/CheckoutModal";

export default function CartPage() {
  const [cartData, setCartData] = useState(null);

  return (
    <>
      <Cart onCheckout={(data) => setCartData(data)} />
      {cartData && (
        <CheckoutModal
          cartData={cartData}
          onClose={() => setCartData(null)}
        />
      )}
    </>
  );
}
