import axiosPublic, { api } from "../lib/axios";
import axios from "../lib/axios";

export const cartsApi = {
  getCartByUserId: (userId) => api.get(`/carts/${userId}`),
  removeCartItem: (cartId) => api.delete(`/carts/${cartId}`),
};
