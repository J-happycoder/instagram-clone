import "../styles/main.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { SWRConfig } from "swr";
import fetcher from "../../lib/fetcher";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}

export default MyApp;
