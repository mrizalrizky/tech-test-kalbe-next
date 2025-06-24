import axiosPublic, { api } from "../lib/axios";
import axios from "../lib/axios";

export const productCategoriesApi = {
  createProductCategory: (bodyData) =>
    api.post("/product-categories", bodyData),
  getAllProductCategories: () => api.get("/product-categories"),
  getProductCategoryById: (id) => api.get(`/product-categories/${id}`),
  updateProductCategoryById: (id, bodyData) =>
    api.put(`/product-categories/${id}`),
  deleteProductCategoryById: (id) => api.delete(`/product-categories/${id}`),
};
