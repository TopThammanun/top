import { ReactElement } from 'react';
import '@/styles/globals.css'

//SetUp Store redux
import { Provider as ReduxProvider } from "react-redux";
import store from '@/redux/store';

import { AppPropsWithLayout } from '@/types/layout/AppPropsWithLayout';
import NprogressProvider from '@/providers/nprogress'
import AuthProvider from '@/providers/auth';
import ReactQueryProvider from '@/providers/react-query';
import DateProvider from '@/providers/date';
import { ThemeProvider } from '@/theme/index';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page: ReactElement) => page);

  return (
    <ReactQueryProvider>
      <ReduxProvider store={store}>
        <ThemeProvider>
          <DateProvider>
            <NprogressProvider>
              <AuthProvider>
                {getLayout(<Component {...pageProps} />)}
              </AuthProvider>
            </NprogressProvider>
          </DateProvider>
        </ThemeProvider>
      </ReduxProvider>
    </ReactQueryProvider>
  )
}
