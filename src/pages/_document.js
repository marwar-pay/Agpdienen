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
      <meta name="robots" content="index, follow" />
  <meta name="description" content="Agpdienen offers stylish, high-quality family wear for all ages. Shop coordinated outfits for every occasion with fast delivery and easy returns." />
  <meta name="keywords" content="family clothing, matching outfits, Indian fashion, kids wear, Agpdienen" />

  <meta property="og:title" content="Agpdienen – Trendy Family Wear for All Ages" />
  <meta property="og:description" content="Discover high-quality, stylish clothing for your entire family. Shop now with fast delivery and easy returns." />

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
