import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import '@fortawesome/fontawesome-free/css/all.min.css'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false
          }
        }
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <title>Rắc rối shop của vợ yêu</title>
          <link rel='icon' href='/favicon.ico' />
          <meta charSet='utf-8' />
        </Head>
        <Component {...pageProps} />
        <Script src='https://widget.Cloudinary.com/v2.0/global/all.js'></Script>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp

// QueryClient that allows the queries to interact with the cache.
// And for your QueryClient to be globally available for your application,
// you need to wrap your application with the QueryClientProvider.
