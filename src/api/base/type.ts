import { AxiosRequestConfig } from "axios";

export type apiBaseType = {
  config?: AxiosRequestConfig | undefined;
  urlBase?: string;
  url: string;
};
