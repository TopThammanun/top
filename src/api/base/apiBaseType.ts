import { AxiosRequestConfig } from "axios";


export type apiBaseRequestType = {
  isLoadingScreen?: boolean;
};

export type apiBaseType= {
  config?: AxiosRequestConfig | undefined;
  url: string;
  urlBase?: string;
} & apiBaseRequestType;


