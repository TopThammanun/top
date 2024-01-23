import { AppProps } from "next/app";
import { NextPageWithLayout } from "./NextPageWithLayout";

export type AppPropsWithLayoutType = AppProps & {
  Component: NextPageWithLayout;
};
