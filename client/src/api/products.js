import apiClient from "./client";
import { normalizeProduct, normalizeProducts } from "../utils/product";
import { allProducts } from "../data/Product";

const createSlug = (value = "") =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const withFallbackFields = (product) => ({
  ...product,
  slug: product.slug || createSlug(product.name),
  description:
    product.description ||
    `A curated ${String(product.type || "jewellery").toLowerCase()} ${String(product.category || "piece").toLowerCase()} crafted for elegant everyday styling.`,
});

const fallbackProducts = normalizeProducts(allProducts.map(withFallbackFields));

const filterFallbackProducts = (params = {}) => {
  const { type, category, search } = params;

  return fallbackProducts.filter((product) => {
    const matchesType = type ? product.type?.toLowerCase() === String(type).toLowerCase() : true;
    const matchesCategory = category ? product.category === category : true;
    const searchValue = String(search || "").trim().toLowerCase();
    const matchesSearch = searchValue
      ? [product.name, product.description, product.category, product.type]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(searchValue))
      : true;

    return matchesType && matchesCategory && matchesSearch;
  });
};

const shouldUseFallback = (error) =>
  !error?.response &&
  ["ERR_NETWORK", "ECONNREFUSED", "ERR_CONNECTION_REFUSED"].includes(error?.code || "");

export const fetchProducts = async (params = {}) => {
  try {
    const { data } = await apiClient.get("/products", { params });
    return normalizeProducts(data.products);
  } catch (error) {
    if (shouldUseFallback(error)) {
      console.warn("[products] API unavailable, using local fallback data.", error.message);
      return filterFallbackProducts(params);
    }

    throw error;
  }
};

export const fetchProductBySlug = async (slug) => {
  try {
    const { data } = await apiClient.get(`/products/${slug}`);
    return normalizeProduct(data.product);
  } catch (error) {
    if (shouldUseFallback(error)) {
      const matchedProduct = fallbackProducts.find((product) => product.slug === slug);

      if (matchedProduct) {
        console.warn("[products] Product API unavailable, using local fallback data.", error.message);
        return matchedProduct;
      }
    }

    throw error;
  }
};

export const createProduct = async (payload) => {
  const { data } = await apiClient.post("/products", payload);
  return normalizeProduct(data.product);
};
