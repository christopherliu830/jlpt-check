import { Box } from '@chakra-ui/react';
import { Fragment } from 'react';

export function Divisions({ count }: { count: number }) {
  return (
    <Box w="100%" h="100%" pos="absolute" display="flex" zIndex={2}>
      {Array(count - 1)
        .fill(0)
        .map((_, idx) => (
          <Fragment key={idx}>
            <Box flexGrow={1} />
            <Box flexBasis="4px" background="rgba(0, 0, 0, 0.3)" />
          </Fragment>
        ))}
      <Box flexGrow={1} />
    </Box>
  );
}
