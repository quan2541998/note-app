import axios from "axios";

const accessToken = localStorage.getItem('accessToken');

const axiosClient = axios.create({
  baseURL: "http://localhost:4000/graphql",
  timeout: 1000,
});

axiosClient.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    throw error;
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    throw error;
  }
);

export default axiosClient;