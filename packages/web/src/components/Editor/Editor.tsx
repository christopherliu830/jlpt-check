import React, { useEffect, useState } from 'react';
import { Box, Container, Text } from '@chakra-ui/react';

import type { Exercise } from 'utils/prisma';
import MultipleChoice from 'components/MultipleChoice/MultipleChoice';
import { ExerciseProvider } from 'components/ExerciseProvider/ExerciseProvider';
import { ExerciseText } from 'components/ExerciseText/ExerciseText';

export function Editor({ exercises }: { exercises: Exercise[] }) {
  const [inBrowser, setInBrowser] = useState(false);

  useEffect(() => {
    setInBrowser(true);
  }, [])

  return (
    <Container maxW="4xl">
      <Text fontSize="xl" mt={4}>Exercise Browser</Text>
      <Text fontSize="md" my={2} color="salmon.500">This portion of the site is currently in progress!</Text>
      <hr></hr>
      { exercises.map(exercise => (
        <React.Fragment key={exercise.id}>
          <Box display="flex" flexDir="row" justifyContent="space-between" mt={2}>
            <span>Exercise ID: {exercise.id}</span>
            <span>
              { inBrowser && <ExerciseText>{`Answer: ${exercise.correct.map(c => exercise.choices[c]).join(', ')}`}</ExerciseText> }
            </span>
          </Box>
          <ExerciseProvider exercise={exercise}>
            <MultipleChoice disabled onSubmit={() => {/* nothing */}} />
          </ExerciseProvider>
          <hr></hr>
        </React.Fragment>
      )) }
    </Container>
  );
}