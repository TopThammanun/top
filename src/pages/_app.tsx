import { Fragment, ReactElement } from 'react';
import '@/styles/globals.css'

//SetUp Store redux
import { Provider as ReduxProvider } from "react-redux";
import store from '@/redux/store';

import { AppPropsWithLayoutType } from '@/types/layout/AppPropsWithLayout';
import NprogressProvider from '@/providers/nprogress'
import AuthProvider from '@/providers/auth';
import ReactQueryProvider from '@/providers/react-query';
import DateJSProvider from '@/providers/datejs';
import NextUIProvider from '@/providers/next-ui/index';

export default function App({ Component, pageProps }: AppPropsWithLayoutType) {
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
  )
}
