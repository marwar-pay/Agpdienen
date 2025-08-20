

import { CartProvider } from "@/context/CartContext";
// import store from "@/store";
import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/globals.css"
import { ProductProvider } from "@/context/ProductContext";
// import { Provider } from "react-redux";



export default function App({ Component, pageProps }) {
  return (
    <>

      <CartProvider>
        <ProductProvider>
        {/* <Provider store={store}> */}

        <Component {...pageProps} />
        <ToastContainer position="top-right" autoClose={2000} />
        {/* </Provider> */}
        </ProductProvider>
      </CartProvider>
    </>
  );
}
