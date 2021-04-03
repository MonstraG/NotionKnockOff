import { AppProps } from "next/app";
import Head from "next/head";
import "modern-normalize";
import { GameStateProvider } from "~/components/GameState/GameContext";
import { FC } from "react";

const MyApp: FC<AppProps> = ({ pageProps, Component }): JSX.Element => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Next.js TypeScript Quickstart</title>
    </Head>
    <GameStateProvider>
      <Component {...pageProps} />
    </GameStateProvider>
  </>
)

export default MyApp;
