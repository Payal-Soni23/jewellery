import apiClient from "./client";

export const fetchCart = async (userId) => {
  const { data } = await apiClient.get(`/cart/${userId}`);
  return data.cart;
};

export const saveCart = async (userId, items) => {
  const { data } = await apiClient.post("/cart", { userId, items });
  return data.cart;
};
