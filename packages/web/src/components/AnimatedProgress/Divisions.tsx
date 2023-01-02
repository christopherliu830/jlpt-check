import { Box } from '@chakra-ui/react';
import { Fragment } from 'react';

export function Divisions({ bars }: { bars: number | number[] }) {
  const divisionLocations = Array.isArray(bars)
    ? bars
    : Array(bars)
        .fill(0)
        .map((_, idx) => (idx + 1) / (bars + 1));

  console.log(bars, divisionLocations, 's');

  return (
    <Box w="100%" h="100%" pos="absolute" display="flex" zIndex={2}>
      {divisionLocations.map((x, idx) => (
        <Box
          key={idx}
          position="absolute"
          left={`${x * 100}%`}
          w="4px"
          h="100%"
          background="rgba(0, 0, 0, 0.3)"
          transform="translateX(-50%)"
        />
      ))}
      <Box flexGrow={1} />
    </Box>
  );
}
