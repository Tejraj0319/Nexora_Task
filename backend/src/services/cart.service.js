import CartItem from "../models/cart.model.js";

const addToCart = async (productId, qty) => {
  try {
    let existing = await CartItem.findOne({ productId });

    if (existing) {
      existing.qty += qty;
      await existing.save();
      return existing;
    }
    const newItem = new CartItem({ productId, qty });
    await newItem.save();

    return newItem;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw new Error("Failed to add item to cart");
  }
};

const getCart = async () => {
  try {
    const cart = await CartItem.find().populate("productId");
    const total = cart.reduce((sum, item) => {
      if (item.productId && item.productId.price) {
        return sum + item.productId.price * item.qty;
      }
      return sum;
    }, 0);
    return { cart, total };
  } catch (error) {
    console.error("Error retrieving cart items:", error);
    throw new Error("Failed to retrieve cart items");
  }
};


const removeFromCart = async (id) => {
  try {
    const deletedItem = await CartItem.findByIdAndDelete(id);
    if (!deletedItem) {
      throw new Error("Cart item not found");
    }
    return deletedItem;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw new Error("Failed to remove item from cart");
  }
};

export { addToCart, getCart, removeFromCart };