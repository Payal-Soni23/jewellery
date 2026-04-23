import express from "express";
import { getCartByUserId, upsertCart } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, upsertCart);
router.get("/:userId", protect, getCartByUserId);

export default router;
