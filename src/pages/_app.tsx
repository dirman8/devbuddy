import '@/styles/globals.css'
import AuthUserProvider from '../utils/lib/AuthUserProvider'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from "react-query";
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  const queryClient =  new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <AuthUserProvider>
            <Head>
              <title>Dev Buddy</title>
              <meta name="description" content="A Web Developer Buddy " />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="icon" href="/db.ico"/>
            </Head> 
            <Component {...pageProps} />
        </AuthUserProvider>
    </QueryClientProvider>
  )
}
