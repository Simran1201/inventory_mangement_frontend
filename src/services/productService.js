import api from "../api/axios";
import { API_ROUTES } from "../constants/api";

export const getProducts = async () => {
  const res = await api.get(API_ROUTES.PRODUCTS);
  return res.data;
};
