// const { default: axios } = require("axios");

import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const getAuthToken = () => {
  return localStorage.getItem("token") || "";
};

  //axios client for instance
const client = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  client.interceptors.request.use(
    
    (config) => {
      config.headers["authorization"] = getAuthToken();
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const request = {
    get: (url, params, config) =>
        client
        .get(url, { params: params, ...config })
        .then((res) => res.data)
        .catch((err) => {
          if (config?.responseType === "blob") {
            return Promise.reject(err);
          }
          return Promise.reject(err.response.data);
        }),
    post: (url, data, config) =>
        client
        .post(url, data, config)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err.response.data)),
    put: (url, data) =>
        client
        .put(url, data)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err.response.data)),
    patch: (url, data) =>
        client
        .patch(url, data)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err.response.data)),
    delete: (url, data) =>
        client
        .delete(url, { data: data })
        .then((res) => res.data)
        .catch((err) => Promise.reject(err.response.data)),
  };
  
  const user = {
    login: (data) => request.post(`users/login`, data),
    checkEmail: (data) => client.get(`users/checkemail?email=${data}`),
    resetPassword: (data) => request.put(`users/forgotPassword`, data),
    registerUser: (data) => request.post(`users/register`, data),
    updateUser: (data) => request.put(`users/updateUser?id=${data?.id}`, data.formData),
    getUsers : () => request.get(`users/getUsers`),
    getUserById : (data) => request.get(`/users/userProfile`, data)
  };

  const product = {
    getProducts : () => client.get(`products/list`),
    createProduct : (data) => client.get(`api/product/create`, data),
    updateProduct : (data) => client.put(`api/product/update?id=${data.id}`, data?.formData),
    getProduct : (data) => client.get(`api/product/${data}`),
    getProductsById : (data) => client.get(`api/products?ids=${data}`) ,
    getSearchedProducts : (data) => client.get(`api/products?ids=${data}`) ,
    deleteProduct : (data) => client.delete(`api/product/:id`)
  }

  const cart = {
    getCartItems : () => client.get(`api/cart/list`),
    addCartItems : (data) => client.post(`api/cart/${data}`),
    deleteCartItem : (data) => client.delete(`api/cart/${data}`),
    updateCartItemQuantity : (data) => client.put(`api/cart/${data.id}`, data.body)
  }
  

  export const api = {
    user,
    product,
    cart
  };