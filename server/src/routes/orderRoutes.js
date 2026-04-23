import express from "express";
import { createOrder, getOrdersByUserId } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/:userId", protect, getOrdersByUserId);

export default router;
