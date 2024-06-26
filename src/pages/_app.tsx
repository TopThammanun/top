import { Fragment, ReactElement } from "react";
import "@/styles/globals.css";
import dynamic from "next/dynamic";
//SetUp Store redux
import { Provider as ReduxProvider } from "react-redux";
import store from "@/store";
import { AppPropsWithLayoutType } from "@/types/layout/AppPropsWithLayout";
import NprogressProvider from "@/providers/nprogress";
import AuthProvider from "@/providers/auth";
import ReactQueryProvider from "@/providers/react-query";
import DateJSProvider from "@/providers/datejs";
import NextUIProvider from "@/providers/next-ui/index";
import { appWithTranslation } from "next-i18next";

const App = ({ Component, pageProps }: AppPropsWithLayoutType) => {
  const getLayout = Component.getLayout || ((page: ReactElement) => page);

  return (
    <Fragment>
      <ReactQueryProvider>
        <ReduxProvider store={store}>
          <NprogressProvider>
            <NextUIProvider>
              <DateJSProvider>
                <AuthProvider>
                  {getLayout(<Component {...pageProps} />)}
                </AuthProvider>
              </DateJSProvider>
            </NextUIProvider>
          </NprogressProvider>
        </ReduxProvider>
      </ReactQueryProvider>
    </Fragment>
  );
};

export default appWithTranslation(App);
