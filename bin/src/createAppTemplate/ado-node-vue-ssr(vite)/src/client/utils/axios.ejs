import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const request = axios.create({
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

// 请求拦截器
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      );
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status } = response;
    if (status == 200 || status == 201) {
      return response.data;
    }
    return Promise.reject(new Error("Error"));
  },
  (error) => {
    return Promise.reject(new Error(error || "Error"));
  }
);

export default request;
