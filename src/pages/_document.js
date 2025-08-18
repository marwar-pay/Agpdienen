
import Footer from "@/Layout/Footer";
// import Header from "@/Layout/Header";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="assets/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta
          name="google-site-verification"
          content="AYRuZPPy7CY-97bqRlnOcFI_tkBkF2ji0owUSQ3G41s"
        />
        <meta
          name="description"
          content="Agpdienen offers stylish and comfortable clothing for men, women, and kids. Discover everyday essentials to festive outfits – all in one place."
        />
        <meta
          name="keywords"
          content="family clothing, matching outfits, Indian fashion, kids wear, Agpdienen"
        />

        <meta
          property="og:title"
          content="Agpdienen – Trendy Family Wear for All Ages"
        />
        <meta
          property="og:description"
          content="Discover high-quality, stylish clothing for your entire family. Shop now with fast delivery and easy returns."
        />

        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased">
        {/* <Header/> */}
        <Main />
        <Footer />
        <NextScript />

        {/* Bootstrap JS */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />

        {/* Facebook Pixel */}
        <Script id="fb-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1143255717659191');
            fbq('track', 'PageView');
          `,
        }} />

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1143255717659191&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </Html>
  );
}
