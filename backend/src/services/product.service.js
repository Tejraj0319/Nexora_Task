import Product from "../models/product.model.js";
import {mockProducts} from "../utils/mockData.js"

const getProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(mockProducts);
    }
    return Product.find();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve products");
  }
};

export default getProducts;
