import apiClient from "./client";

export const createOrder = async (payload) => {
  const { data } = await apiClient.post("/orders", payload);
  return data.order;
};

export const fetchOrders = async (userId) => {
  const { data } = await apiClient.get(`/orders/${userId}`);
  return data.orders;
};
