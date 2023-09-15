import { AppProps } from "next/app";
import { NextPageWithLayout } from "./NextPageWithLayout";

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
