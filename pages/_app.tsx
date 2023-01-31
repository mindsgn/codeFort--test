
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { BookProvider } from '@/context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <BookProvider>
        <Component {...pageProps} />
      </BookProvider>
    </ChakraProvider>
  )
}
