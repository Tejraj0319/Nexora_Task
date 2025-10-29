import Product from "../models/product.model.js";

export const checkout = async (cartItems) => {
  try {
    if (!cartItems || cartItems.length === 0) {
      throw new Error("Cart is empty or invalid");
    }

    let total = 0;

    for (const item of cartItems) {
      const product = await Product.findById(item.productId);
      if (!product) throw new Error(`Product not found: ${item.productId}`);
      total += product.price * item.qty;
    }

    return {
      success: true,
      message: "Mock checkout successful",
      total,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error during checkout:", error);
    throw new Error(error.message);
  }
};
