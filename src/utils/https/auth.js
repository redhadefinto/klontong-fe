/* eslint-disable no-undef */
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const login = (controller, email, password) => {
  const body = {
    email,
    password,
  };
  return axios.post(`${baseUrl}/auth/login`, body, {
    signal: controller.signal,
  });
};
