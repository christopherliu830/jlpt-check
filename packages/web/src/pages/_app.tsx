import '@fontsource/atkinson-hyperlegible';

import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import { theme } from 'theme/theme';
import { PageContainer } from 'components/PageContainer/PageContainer';
import { QuizProvider } from 'components/Quiz/QuizProvider';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <QuizProvider>
          <PageContainer>
            <Component {...pageProps} />
          </PageContainer>
        </QuizProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
