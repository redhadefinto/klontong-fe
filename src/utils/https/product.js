/* eslint-disable no-undef */
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const getProducts = (controller, querys) => {
  return axios.get(`${baseUrl}/products?${querys}`, {
    signal: controller.signal,
  });
};
