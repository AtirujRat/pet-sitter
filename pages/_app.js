import "@/styles/globals.css";
import Layout from "@/components/layout";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout;
  if (getLayout) {
    return getLayout(<Component {...pageProps} />);
  } else
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
}
