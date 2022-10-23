import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import { theme } from '../src/theme/theme';
import { PageContainer } from '../src/components/PageContainer/PageContainer';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <PageContainer>
          <Component {...pageProps} />
        </PageContainer>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
