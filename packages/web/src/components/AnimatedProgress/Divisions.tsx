import { Box } from '@chakra-ui/react';

export function Divisions({ count }: { count: number }) {
  return (
    <Box w="100%" h="100%" pos="absolute" display="flex" zIndex={2}>
      {Array(count - 1)
        .fill(0)
        .map((_, idx) => (
          <>
            <Box key={idx} flexGrow={1} />
            <Box key={idx + count} flexBasis="4px" background="rgba(0, 0, 0, 0.3)" />
          </>
        ))}
      <Box flexGrow={1} />
    </Box>
  );
}
