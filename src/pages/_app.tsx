// @ts-ignore
import('src/css/fontawesome@6.1.2.css')
// @ts-ignore
import('react-quill/dist/quill.snow.css')
// @ts-ignore
import('src/css/globals.css')
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import theme from '../theme'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Script strategy='lazyOnload' src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`} />
      <Script strategy='lazyOnload' id='google-tag-manager'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}');
        `}
      </Script>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App