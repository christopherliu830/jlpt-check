import { Box, BoxProps, Text } from '@chakra-ui/layout';
import React from 'react';


export interface ChoiceProps extends BoxProps {
  fullWidth?: boolean;
}

export function Choice({
  fullWidth = false,
  ...props
}: ChoiceProps): React.ReactElement {
  return (
    <Box 
      bg="violet.100"
      w={fullWidth ? '100%' : 'auto'}
      {...props}
    >
    </Box>
  )
}