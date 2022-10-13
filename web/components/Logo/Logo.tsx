import React from 'react';
import { Text, TextProps } from '@chakra-ui/react';

export function Logo(props: TextProps): React.ReactElement {
  return (
    <Text {...props} cursor="pointer">
      <b>JLPT</b>Check
    </Text>
  );
}
