import Alert from "@/components/ui/alert";
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

const apiBase = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Accept: process.env.NEXT_PUBLIC_ACCEPT,
    token: process.env.NEXT_PUBLIC_TOKEN,
  },
});

apiBase.interceptors.request.use((config) => {
  return config;
});

apiBase.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.log("error.response", error?.response);
      Alert.error({
        content: error?.response?.data?.message,
      });
    }
  }
);

const encodeURI = (url: string) =>
  encodeURIComponent(url).replace(/%2F/gi, "/");

const api = {
  async get(url: string, config?: AxiosRequestConfig | undefined) {
    const res = await apiBase.get(encodeURI(url), config);
    return res?.data;
  },
  async post(url: string, data: any, config?: AxiosRequestConfig | undefined) {
    const res = await apiBase.post(encodeURI(url), data, config);
    return res?.data;
  },
  async put(url: string, data: any, config?: AxiosRequestConfig | undefined) {
    const res = await apiBase.put(encodeURI(url), data, config);
    return res?.data;
  },
  async patch(url: string, data: any, config?: AxiosRequestConfig | undefined) {
    const res = await apiBase.patch(encodeURI(url), data, config);
    return res?.data;
  },
  async delete(url: string, config?: AxiosRequestConfig | undefined) {
    const res = await apiBase.delete(encodeURI(url), config);
    return res?.data;
  },
};

export default api;
export { axios, param, baseURL };
