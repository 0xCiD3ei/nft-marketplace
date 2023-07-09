import {Provider} from "react-redux";
import {persistor, store} from "src/redux/store";
import {PersistGate} from "redux-persist/integration/react";
import {ToastContainer} from "react-toastify";

import "src/styles/index.scss";
import 'src/styles/globals.css';
import "src/assets/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "rc-slider/assets/index.css";
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
      <ToastContainer
        position="bottom-right"
        theme={typeof localStorage !== "undefined" && localStorage.theme === "light" ? "light" : "dark"}
      />
    </Provider>
  )
}
