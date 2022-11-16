import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import "@styles/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'nprogress/nprogress.css';
import "react-toastify/dist/ReactToastify.css";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { AppContextProvider } from "@src/contexts/AppContext";
import { ToastContainer, Zoom } from 'react-toastify';
import createEmotionCache from "@src/createEmotionCache";
import nProgress from 'nprogress';
import Router from "next/router";

const clientSideEmotionCache = createEmotionCache();

type PageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface CustomerBehaviorAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: PageWithLayout;
}

const CustomerBehaviorApp = (props: CustomerBehaviorAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  return (
    <CacheProvider value={emotionCache}>
      <AppContextProvider>
        {getLayout(<Component {...pageProps} />)}
        <ToastContainer position="bottom-right" transition={Zoom} hideProgressBar={true} theme='light' pauseOnHover pauseOnFocusLoss closeOnClick />
      </AppContextProvider>
    </CacheProvider>
  )
}

export default appWithTranslation(CustomerBehaviorApp);
