import api from "../api/axios";
import { API_ROUTES } from "../constants/api";

export const placeOrder = async (data) => {
  const res = await api.post(API_ROUTES.ORDERS, data);
  return res.data;
};

export const getOrderDetails = async (id) => {
  const res = await api.get(`/orders/${id}`);
  return res.data;
};
