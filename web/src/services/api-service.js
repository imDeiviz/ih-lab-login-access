import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

const http = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export const profile = () => {
  return http.get("/users/me");
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/sessions`, credentials, { withCredentials: true });
  return response.data;
};

export const logout = () => {
  return http.delete("/sessions");
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
};
