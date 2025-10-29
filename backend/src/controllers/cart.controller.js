import {
  addToCart,
  getCart,
  removeFromCart,
} from "../services/cart.service.js";

const addCartItem = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const data = await addToCart(productId, qty);
    return res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCartItems = async (req, res) => {
  try {
    const data = await getCart();
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    await removeFromCart(id);
    return res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { addCartItem, getCartItems, deleteCartItem };
