import React from 'react';
import { Box } from '@chakra-ui/react';
import { useExercise } from 'components/ExerciseProvider/ExerciseProvider';

export function BlankSpace({ fill }: { fill?: boolean }) {
  const { exercise, selected } = useExercise();
  return (
    <Box display="inline-block" boxShadow="sm" border="2px solid black" mx={2} minW="120px" textAlign="center">
      {fill && selected[0] !== undefined ? (
        exercise?.choices[selected[0]]
      ) : (
        <Box as="span" visibility="hidden">
          _
        </Box>
      )}
    </Box>
  );
}
