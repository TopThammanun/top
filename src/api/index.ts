import Alert from "@/components/ui/alert";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";

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
    // Authorization: `Bearer ${Cookies.get("token")}`, //*if have Authorization*/
  },
});

apiBase.interceptors.request.use((config) => {
  // const dispatch = useDispatch();
  // const sttingReducer = useSelector((state: ReducerType ) => state.sttingReducer);

  if (config.headers.isDisableLoading) {
    console.log("no loading");
    delete config.headers.isDisableLoading;
  } else {
    console.log("start loading");
    // const addCount = 1;
    // dispatch(
    //   SttingReducer.updateState({
    //     loadingScreen: {
    //       ...sttingReducer.loadingScreen,
    //       countApi: addCount,
    //     },
    //   })
    // );
  }

  return config;
});

apiBase.interceptors.response.use(
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

const encodeURI = (url: string) => {
  return encodeURIComponent(url).replace(/%2F/gi, "/");
};

const handleIsDisableLoading = (
  config: AxiosRequestConfig | undefined,
  isDisableLoading: boolean | undefined
) => {
  config = {
    ...config,
    headers: { ...config?.headers, isDisableLoading: isDisableLoading },
  };
  return config;
};

const api = {
  async get(req: {
    url: string;
    config?: AxiosRequestConfig | undefined;
    isDisableLoading?: boolean;
  }) {
    handleIsDisableLoading(req?.config, req?.isDisableLoading);
    const res = await apiBase.get(encodeURI(req.url), req?.config);
    return res?.data;
  },

  async post(req: {
    url: string;
    data: any;
    config?: AxiosRequestConfig | undefined;
    isDisableLoading?: boolean;
  }) {
    handleIsDisableLoading(req?.config, req?.isDisableLoading);
    const res = await apiBase.post(encodeURI(req.url), req.data, req?.config);
    return res?.data;
  },

  async put(req: {
    url: string;
    data: any;
    config?: AxiosRequestConfig | undefined;
    isDisableLoading?: boolean;
  }) {
    handleIsDisableLoading(req?.config, req?.isDisableLoading);
    const res = await apiBase.put(encodeURI(req.url), req.data, req?.config);
    return res?.data;
  },

  async patch(req: {
    url: string;
    data: any;
    config?: AxiosRequestConfig | undefined;
    isDisableLoading?: boolean;
  }) {
    handleIsDisableLoading(req?.config, req?.isDisableLoading);
    const res = await apiBase.patch(encodeURI(req.url), req.data, req?.config);
    return res?.data;
  },

  async delete(req: {
    url: string;
    config?: AxiosRequestConfig | undefined;
    isDisableLoading?: boolean;
  }) {
    handleIsDisableLoading(req?.config, req?.isDisableLoading);
    const res = await apiBase.delete(encodeURI(req.url), req?.config);
    return res?.data;
  },
};

export default api;
export { axios, param, baseURL };
