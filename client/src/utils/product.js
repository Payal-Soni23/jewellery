export const resolveId = (value) => {
  if (!value) {
    return "";
  }

  if (typeof value === "object") {
    return String(value._id || value.id || "");
  }

  return String(value);
};

export const resolveProductId = (item) => resolveId(item?.productId || item?._id || item?.id);

export const normalizeCartItem = (item) => {
  const productId = resolveProductId(item);

  if (!productId) {
    return null;
  }

  return {
    productId,
    name: item?.name || "Unnamed product",
    slug: item?.slug || "",
    price: Number(item?.price || 0),
    image: item?.image || item?.images?.[0] || "",
    category: item?.category || "",
    quantity: Math.max(1, Number(item?.quantity || 1)),
  };
};

export const normalizeCartItems = (items = []) =>
  items.map(normalizeCartItem).filter(Boolean);

export const mapCartItemToOrderProduct = (item) => {
  const productId = resolveProductId(item);

  if (!productId) {
    throw new Error(`Product ID missing for cart item "${item?.name || "Unknown"}"`);
  }

  return {
    productId,
    name: item?.name || "Unnamed product",
    price: Number(item?.price || 0),
    quantity: Math.max(1, Number(item?.quantity || 1)),
    image: item?.image || "",
  };
};
