import apiClient from "./client";

export const fetchProducts = async (params = {}) => {
  const { data } = await apiClient.get("/products", { params });
  return data.products;
};

export const fetchProductBySlug = async (slug) => {
  const { data } = await apiClient.get(`/products/${slug}`);
  return data.product;
};

export const createProduct = async (payload) => {
  const { data } = await apiClient.post("/products", payload);
  return data.product;
};
