import express from "express";
import { addCartItem, getCartItems, deleteCartItem } from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", getCartItems);
router.post("/", addCartItem);
router.delete("/:id", deleteCartItem);

export default router;
