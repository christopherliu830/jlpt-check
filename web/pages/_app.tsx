import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { theme } from '../theme/theme';
import { PageContainer } from '../components/PageContainer/PageContainer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <PageContainer>
        <Component { ...pageProps} />
      </PageContainer>
    </ChakraProvider>
  )
}

export default MyApp;