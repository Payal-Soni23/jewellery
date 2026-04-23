import mongoose from "mongoose";
import Order from "../models/Order.js";

/**
 * @desc    Create a new order
 * @route   POST /api/orders
 * @access  Private
 */

export const createOrder = async (req, res) => {
  try {
    const { products, totalAmount, shippingAddress } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ success: false, message: "No products in order" });
    }

    if (Number.isNaN(Number(totalAmount)) || Number(totalAmount) <= 0) {
      return res.status(400).json({ success: false, message: "A valid total amount is required" });
    }

    const requiredAddressFields = ["fullName", "street", "town", "state", "country", "phone", "email"];
    const missingAddressField = requiredAddressFields.find(
      (field) => !String(shippingAddress?.[field] || "").trim()
    );

    if (missingAddressField) {
      return res.status(400).json({
        success: false,
        message: `Shipping address field "${missingAddressField}" is required`,
      });
    }

    const formattedProducts = products.map((item, index) => {
      const rawProductId = item?.productId || item?._id || item?.id;
      const productId = typeof rawProductId === "object"
        ? rawProductId?._id || rawProductId?.id
        : rawProductId;

      if (!productId) {
        throw Object.assign(new Error(`productId missing for item at index ${index}`), { statusCode: 400 });
      }

      const name = String(item?.name || "").trim();
      const price = Number(item?.price);
      const quantity = Number(item?.quantity);

      if (!mongoose.Types.ObjectId.isValid(String(productId))) {
        throw Object.assign(new Error(`Invalid productId for item at index ${index}`), { statusCode: 400 });
      }

      if (!name) {
        throw Object.assign(new Error(`Product name is required for item at index ${index}`), { statusCode: 400 });
      }

      if (Number.isNaN(price) || price < 0) {
        throw Object.assign(new Error(`Invalid price for item at index ${index}`), { statusCode: 400 });
      }

      if (!Number.isInteger(quantity) || quantity < 1) {
        throw Object.assign(new Error(`Invalid quantity for item at index ${index}`), { statusCode: 400 });
      }

      return {
        productId,
        name,
        price,
        quantity,
        image: typeof item?.image === "string" ? item.image : "",
      };
    });

    const order = new Order({
      userId: req.user._id,
      products: formattedProducts,
      totalAmount: Number(totalAmount),
      shippingAddress: {
        fullName: shippingAddress.fullName.trim(),
        street: shippingAddress.street.trim(),
        town: shippingAddress.town.trim(),
        state: shippingAddress.state.trim(),
        country: shippingAddress.country.trim(),
        phone: shippingAddress.phone.trim(),
        email: shippingAddress.email.trim().toLowerCase(),
      },
      status: "Pending",
    });

    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server error while creating order",
    });
  }
};

/**
 * @desc    Get orders by user ID
 * @route   GET /api/orders/:userId
 * @access  Private
 */
export const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: "You can only view your own orders" });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    res.status(500).json({ success: false, message: "Server error while fetching orders" });
  }
};
