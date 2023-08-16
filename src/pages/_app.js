import React from 'react';
import {Provider} from "react-redux";
import {persistor, store} from "src/redux/store";
import {PersistGate} from "redux-persist/integration/react";
import {ToastContainer} from "react-toastify";
import {ChainId, ThirdwebProvider} from "@thirdweb-dev/react";
import {NFTMarketplaceProvider} from "src/context/NFTMarketplaceContext";
import "nprogress/nprogress.css";
import NProgress from "nprogress";

import "src/styles/index.scss";
import 'src/styles/globals.css';
import "src/assets/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "rc-slider/assets/index.css";
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from "next/router";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();
  
  React.useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();
    
    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);
    
    return () => {
      // Make sure to remove the event handler on unmount!
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    };
  }, [router.events]);
    
    
    return (
    <ThirdwebProvider activeChain={ChainId.Mumbai} clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NFTMarketplaceProvider>
            {getLayout(<Component {...pageProps} />)}
          </NFTMarketplaceProvider>
        </PersistGate>
        <ToastContainer
          position="bottom-right"
          theme={typeof localStorage !== "undefined" && localStorage.theme === "light" ? "light" : "dark"}
        />
      </Provider>
    </ThirdwebProvider>
  )
}
