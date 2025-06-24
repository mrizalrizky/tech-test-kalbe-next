import axiosPublic, { api } from "../lib/axios";
import axios from "../lib/axios";

export const productsApi = {
  getAllProducts: () => api.get("/products"),
  getProductById: (id) => api.get(`/products/${id}`),
  updateProductById: (id, bodyData) => api.put(`/products/${id}`),
  deleteProductById: (id) => api.delete(`/products/${id}`),
};
