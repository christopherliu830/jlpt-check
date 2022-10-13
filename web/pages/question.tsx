import { useEffect, useState } from 'react';

import { Container } from '@chakra-ui/react';
import type { Exercise } from '@prisma/client';

import MultipleChoice from '../src/components/MultipleChoice/MultipleChoice';

function Question() {
  const [exercise, setExercise] = useState<Exercise | undefined>();

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/exercise', {
        method: 'POST',
      });
      const data = (await response.json()) as Exercise;
      setExercise(data);
    })();
  }, []);

  return (
    <Container size="sm">
      <MultipleChoice />
    </Container>
  );
}

export default Question;
