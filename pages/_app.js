import "@/styles/globals.css";
import Layout from "@/components/layout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";

const GA_TRACKING_ID = "G-NEV08CKQK8"; // Your Google Analytics ID

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const getLayout = Component.getLayout;

  return (
    <>
      {/* Google Analytics script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      {/* Render the layout */}
      {getLayout ? (
        getLayout(<Component {...pageProps} />)
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
}
