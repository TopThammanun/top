import Alert from "@/components/shared/alert";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { apiBaseType } from "./apiBaseType";
import * as globalReducer from "@/redux/reducers/global";
import { ReducerType } from "@/redux/store";

const param = $.param;
const defaultURL = "https://randomuser.me";

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

const axiosBase = axios.create({
  headers: {
    Accept: process.env.NEXT_PUBLIC_ACCEPT,
    token: process.env.NEXT_PUBLIC_TOKEN,
    // Authorization: `Bearer ${Cookies.get("token")}`, //*send token in Header*/
  },
});

axiosBase.interceptors.request.use((config) => {
  return config;
});

axiosBase.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.log("error.response", error?.response);
      if (error.response.status) {
        Alert.error({
          content: error?.response?.data?.message,
          color: "danger",
        });
      }
    }
  }
);

const handleURL = (req: apiBaseType) => {
  const url = req.urlBase || defaultURL;
  req.urlBase = url;
};

const encodeURI = (req: apiBaseType) => {
  const enCodeURI = encodeURIComponent(req.url).replace(/%2F/gi, "/");
  return `${req.urlBase}${enCodeURI}`;
};

const apiBase = {
  async get(req: apiBaseType) {
    handleURL(req);
    const res = await axiosBase.get(encodeURI(req), req.config);
    return res?.data;
  },

  async post(req: { data: any } & apiBaseType) {
    handleURL(req);
    const res = await axiosBase.post(encodeURI(req), req.data, req.config);
    return res?.data;
  },

  async put(req: { data: any } & apiBaseType) {
    handleURL(req);
    const res = await axiosBase.put(encodeURI(req), req.data, req.config);
    return res?.data;
  },

  async patch(req: { data: any } & apiBaseType) {
    handleURL(req);
    const res = await axiosBase.patch(encodeURI(req), req.data, req.config);
    return res?.data;
  },

  async delete(req: apiBaseType) {
    handleURL(req);
    const res = await axiosBase.delete(encodeURI(req), req.config);
    return res?.data;
  },
};

export default apiBase;
export { axios, param, axiosBase };
