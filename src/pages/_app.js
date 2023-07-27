import {Provider} from "react-redux";
import {persistor, store} from "src/redux/store";
import {PersistGate} from "redux-persist/integration/react";
import {ToastContainer} from "react-toastify";
import {ChainId, ThirdwebProvider} from "@thirdweb-dev/react";
import {NFTMarketplaceProvider} from "src/context/NFTMarketplaceContext";
import AuthProvider from "src/components/providers/AuthProvider";

import "src/styles/index.scss";
import 'src/styles/globals.css';
import "src/assets/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "rc-slider/assets/index.css";
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  
  return (
    <ThirdwebProvider activeChain={ChainId.Mumbai}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <NFTMarketplaceProvider>
              {getLayout(<Component {...pageProps} />)}
            </NFTMarketplaceProvider>
          </AuthProvider>
        </PersistGate>
        <ToastContainer
          position="bottom-right"
          theme={typeof localStorage !== "undefined" && localStorage.theme === "light" ? "light" : "dark"}
        />
      </Provider>
    </ThirdwebProvider>
  )
}
