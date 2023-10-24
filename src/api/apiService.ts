import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import $ from "jquery";

const param = $.param;
const baseURL = process.env.NEXT_PUBLIC_SERVICE;

export class ServerError extends Error {
  status: number;
  response: any;

  constructor(status: number, response: any) {
    super("Error from server");
    this.status = status;
    this.response = response;
    this.name = "ServerError";
  }
}

const service = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Accept: process.env.NEXT_PUBLIC_ACCEPT,
    token: process.env.NEXT_PUBLIC_TOKEN,
  },
});

service.interceptors.request.use((config) => {
  return config;
});

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.log("error.response", error?.response);
    }
  }
);

const encodeURI = (url: string) =>
  encodeURIComponent(url).replace(/%2F/gi, "/");

const apiService = {
  async get(url: string, config?: AxiosRequestConfig | undefined) {
    const res = await service.get(encodeURI(url), config);
    return res?.data;
  },
  async post(url: string, data: any, config?: AxiosRequestConfig | undefined) {
    const res = await service.post(encodeURI(url), data, config);
    return res?.data;
  },
  async put(url: string, data: any, config?: AxiosRequestConfig | undefined) {
    const res = await service.put(encodeURI(url), data, config);
    return res?.data;
  },
  async patch(url: string, data: any, config?: AxiosRequestConfig | undefined) {
    const res = await service.patch(encodeURI(url), data, config);
    return res?.data;
  },
  async delete(url: string, config?: AxiosRequestConfig | undefined) {
    const res = await service.delete(encodeURI(url), config);
    return res?.data;
  },
};

export default apiService;
export { axios, param, baseURL };
