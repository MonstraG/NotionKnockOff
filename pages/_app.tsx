import { AppProps } from 'next/app'
import Head from 'next/head'

import 'modern-normalize'
import { GameContext, InitialGameState } from '~/components/GameStateContext'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Next.js TypeScript Quickstart</title>
      </Head>
      <GameContext.Provider value={InitialGameState}>
        <Component {...pageProps} />
      </GameContext.Provider>
    </>
  )
}
