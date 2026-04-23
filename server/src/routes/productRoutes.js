import express from "express";
import { createProduct, getProductBySlug, getProducts } from "../controllers/productController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:slug", getProductBySlug);
router.post("/", protect, adminOnly, createProduct);

export default router;
