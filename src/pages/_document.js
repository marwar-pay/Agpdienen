import Footer from "@/Layout/Footer";
// import Header from "@/Layout/Header";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link rel="icon" type="image/svg+xml/png" href="assets/logo.png" />
      {/* <meta name="viewport" content="width=device-width, initial-scale=1.0"/> */}
     
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"/>

<Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"/>

      </Head>
      <body className="antialiased">
        {/* <Header/> */}
        <Main />
        <Footer/>
        <NextScript />
      </body>
    </Html>
  );
}
