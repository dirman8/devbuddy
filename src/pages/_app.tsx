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
            <Component {...pageProps} />
        </AuthUserProvider>
    </QueryClientProvider>
  )
}
