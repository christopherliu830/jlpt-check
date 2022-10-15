import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Center, Container, Text } from '@chakra-ui/react';
import type { Directive, Exercise } from '@prisma/client';

import MultipleChoice from '../src/components/MultipleChoice/MultipleChoice';
import { MultipleChoiceExercise } from './api/exercise';
import { QuizResponse } from '../src/components/Quiz/QuizResponse';
import { handleWebpackExtenalForEdgeRuntime } from 'next/dist/build/webpack/plugins/middleware-plugin';

function Question() {
  const [exercise, setExercise] = useState<MultipleChoiceExercise[] | undefined>();
  const [result, setResult] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/exercise', {
        method: 'POST',
      });
      const data = (await response.json()) as MultipleChoiceExercise[];
      setExercise(data);
    })();
  }, []);

  const handleSubmit = () => {
    if (result) {
      setResult(undefined);
    } else {
      setResult('success');
    }
  };

  if (!exercise) {
    return <Container />;
  }

  return (
    <Container maxW="2xl" centerContent pos="relative">
      <Text fontSize="2xl" mt={12}>
        {exercise[0].directive.prompt}
      </Text>
      <MultipleChoice exercise={exercise[0]} onSubmit={handleSubmit} />
      <QuizResponse response={result} onTimeout={() => setResult(undefined)} />
    </Container>
  );
}

export default Question;
