import { Flex } from '@chakra-ui/layout';
import React from 'react';
import { Navbar } from '../Navbar/Navbar';

export interface PageContainerProps  {
  children: React.ReactNode;
}

export function PageContainer({children}: PageContainerProps): React.ReactElement {
  return (
    <Flex
      flexFlow="column nowrap"
      h="100vh"
      w="100vw"
    >
      <Navbar />
      { children } 
    </Flex>
  )

}