import { Box } from '@chakra-ui/layout';
import React from 'react';
import { Choice } from '../Choice/Choice';

export function Quiz(): React.ReactElement {
  return (
    <Box w="100%" h="100%">
      <Choice>Test Choice</Choice>
    </Box>
  ) 
}