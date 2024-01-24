import Alert from "@/components/shared/alert";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { apiBaseType, apiBaseRequestType } from "./apiBaseType";
import * as loadingScreenReducer from "@/redux/reducers/loadingScreenReducer";
import { ReducerType } from "@/redux/store";

const param = $.param;
const urlBaseDefault = process.env.NEXT_PUBLIC_API || '';

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
  baseURL: urlBaseDefault,
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

const encodeURI = (url: string, urlBase: string) => {
  const enCodeURI = encodeURIComponent(url).replace(/%2F/gi, "/")
  return `${urlBase}${enCodeURI}`
};

const handleStartLoadingScreen = (isLoadingScreen: boolean | undefined, action: "add" | "delete") => {
  const dispatch = useDispatch()
  const loadingScreenReducerData = useSelector((state: ReducerType) => state.loadingScreenReducer)

  if (isLoadingScreen) {
    let countLoadingAPI = loadingScreenReducerData.countLoadingAPI

    if(countLoadingAPI){
      if(countLoadingAPI < 0){
        countLoadingAPI = 0
      }else {
        switch (action) {
          case "add":
            countLoadingAPI = + 1
            break;
          case "delete":
            countLoadingAPI = - 1
            break;
        }
      }
    }
    dispatch(loadingScreenReducer.updateState({
      countLoadingAPI: countLoadingAPI
    }))
  }
};

const apiBase = {
  async get(req: {
  } & apiBaseType) {
    const { urlBase = urlBaseDefault, url, config, isLoadingScreen } = req
    // handleStartLoadingScreen(isLoadingScreen, 'add')
    const res = await axiosBase.get(encodeURI(url, urlBase), config);
    // handleStartLoadingScreen(isLoadingScreen, 'delete')
    return res?.data;
  },

  async post(req: {
    data: any;
  } & apiBaseType) {
    const { urlBase = urlBaseDefault, url, config, data } = req
    const res = await axiosBase.post(encodeURI(url, urlBase), data, config);
    return res?.data;
  },

  async put(req: {
    data: any;
  } & apiBaseType) {
    const { urlBase = urlBaseDefault, url, config, data } = req
    const res = await axiosBase.put(encodeURI(url, urlBase), data, config);
    return res?.data;
  },

  async patch(req: {
    data: any;
  } & apiBaseType) {
    const { urlBase = urlBaseDefault, url, config, data } = req
    const res = await axiosBase.patch(encodeURI(url, urlBase), data, config);
    return res?.data;
  },

  async delete(req: {
  } & apiBaseType) {
    const { urlBase = urlBaseDefault, url, config } = req
    const res = await axiosBase.delete(encodeURI(url, urlBase), config);
    return res?.data;
  },
};

export default apiBase;
export { axios, param, urlBaseDefault as baseURL }
