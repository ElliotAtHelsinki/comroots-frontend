import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import theme from 'src/theme'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta
            httpEquiv='Content-Security-Policy'
            content='upgrade-insecure-requests'
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
