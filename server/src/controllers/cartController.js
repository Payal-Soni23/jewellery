import Cart from "../models/Cart.js";

const mapCart = (cart) => ({
  _id: cart._id,
  userId: cart.userId,
  items: cart.items.map((item) => ({
    _id: item._id,
    productId: item.productId?._id || item.productId,
    name: item.name || item.productId?.name,
    slug: item.slug || item.productId?.slug,
    price: item.price ?? item.productId?.price,
    image: item.image || item.productId?.images?.[0] || "",
    quantity: item.quantity,
    category: item.category || item.productId?.category,
  })),
});

export const upsertCart = async (req, res, next) => {
  try {
    const routeUserId = req.params.userId || req.body.userId;

    if (routeUserId !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: "You can only update your own cart" });
    }

    const items = Array.isArray(req.body.items) ? req.body.items : [];

    const cart = await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { userId: req.user._id, items },
      { new: true, upsert: true, runValidators: true }
    ).populate("items.productId");

    res.json({ success: true, cart: mapCart(cart) });
  } catch (error) {
    next(error);
  }
};

export const getCartByUserId = async (req, res, next) => {
  try {
    if (req.params.userId !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: "You can only view your own cart" });
    }

    const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");

    if (!cart) {
      return res.json({ success: true, cart: { userId: req.user._id, items: [] } });
    }

    res.json({ success: true, cart: mapCart(cart) });
  } catch (error) {
    next(error);
  }
};
