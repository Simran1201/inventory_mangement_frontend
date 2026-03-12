import api from "../api/axios";
import { API_ROUTES } from "../constants/api";

export const loginUser = async (data) => {
  const res = await api.post(API_ROUTES.LOGIN, data);

  return res.data;
};
