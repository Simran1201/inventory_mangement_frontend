import api from "../api/axios";
import { API_ROUTES } from "../constants/api";

export const createProduct = async (data) => {
  const res = await api.post(API_ROUTES.PRODUCTS, data);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await api.put(`${API_ROUTES.PRODUCTS}/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`${API_ROUTES.PRODUCTS}/${id}`);
  return res.data;
};
