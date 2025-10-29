import getProducts from "../services/product.service.js";

const getAllProducts = async (req, res) => {
  try {
    const result = await getProducts();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

export default getAllProducts;
