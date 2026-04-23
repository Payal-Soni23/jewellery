const CATEGORY_IMAGE_FOLDERS = {
  ring: "rings",
  rings: "rings",
  earring: "earrings",
  earrings: "earrings",
  bracelet: "bracelets",
  bracelets: "bracelets",
  pendant: "pendants",
  pendants: "pendants",
  pendent: "pendants",
  pendents: "pendants",
  neckpendent: "pendants",
};

export const PLACEHOLDER_PRODUCT_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 750'%3E%3Crect width='600' height='750' fill='%23f5efe6'/%3E%3Ccircle cx='300' cy='260' r='88' fill='none' stroke='%23a68a64' stroke-width='20'/%3E%3Cpath d='M175 450c45-80 205-80 250 0' fill='none' stroke='%23a68a64' stroke-width='20' stroke-linecap='round'/%3E%3Ctext x='300' y='610' text-anchor='middle' font-family='Georgia, serif' font-size='32' fill='%23725736'%3EJewellery Image%3C/text%3E%3C/svg%3E";

export const getCategoryImageFolder = (category = "") => {
  const normalizedCategory = String(category).trim().toLowerCase();
  return CATEGORY_IMAGE_FOLDERS[normalizedCategory] || "";
};

export const normalizeProductImagePath = (imagePath = "", category = "") => {
  if (!imagePath) {
    return "";
  }

  if (/^(https?:)?\/\//.test(imagePath) || imagePath.startsWith("data:image")) {
    return imagePath;
  }

  const sanitizedPath = String(imagePath).replace(/\\/g, "/").replace(/^\/+/, "");
  const pathParts = sanitizedPath.split("/").filter(Boolean);
  const filename = pathParts[pathParts.length - 1];

  if (!filename) {
    return "";
  }

  const explicitFolder = getCategoryImageFolder(pathParts[pathParts.length - 2] || "");
  const categoryFolder = getCategoryImageFolder(category);
  const folder = categoryFolder || explicitFolder;

  return folder ? `/images/${folder}/${filename}` : `/${sanitizedPath}`;
};

export const normalizeProduct = (product = {}) => {
  const sourceImages = Array.isArray(product.images)
    ? product.images
    : [product.image].filter(Boolean);

  const normalizedImages = sourceImages
    .map((image) => normalizeProductImagePath(image, product.category))
    .filter(Boolean);

  return {
    ...product,
    images: normalizedImages.length > 0 ? normalizedImages : [PLACEHOLDER_PRODUCT_IMAGE],
    image:
      normalizedImages[0] ||
      normalizeProductImagePath(product.image, product.category) ||
      PLACEHOLDER_PRODUCT_IMAGE,
  };
};

export const normalizeProducts = (products = []) => products.map((product) => normalizeProduct(product));

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
    image:
      normalizeProductImagePath(item?.image || item?.images?.[0], item?.category) ||
      PLACEHOLDER_PRODUCT_IMAGE,
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
    image:
      normalizeProductImagePath(item?.image || item?.images?.[0], item?.category) ||
      PLACEHOLDER_PRODUCT_IMAGE,
  };
};
