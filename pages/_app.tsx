import { AppProps } from "next/app";
import Head from "next/head";
import "modern-normalize";
import { FC } from "react";

const MyApp: FC<AppProps> = ({ pageProps, Component }): JSX.Element => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Test Next.js project</title>
    </Head>
    <Component {...pageProps} />
  </>
);

export default MyApp;
