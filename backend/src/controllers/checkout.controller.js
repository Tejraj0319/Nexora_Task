import { checkout } from "../services/checkout.service.js";

const handleCheckout = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const receipt = await checkout(cartItems);
    return res.status(200).json(receipt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export default handleCheckout;
