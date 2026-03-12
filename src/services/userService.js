import api from "../api/axios";

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get("/users/me");
  return res.data;
};
