import React, { useState } from 'react';
import { Container, Text } from '@chakra-ui/react';
import MultipleChoice from 'components/MultipleChoice/MultipleChoice';
import { fetchExercise } from 'api/exercise';
import { QuizResponse } from 'components/Quiz/QuizResponse';
import { useQuery } from 'react-query';
import { ExerciseText } from 'components/ExerciseText/ExerciseText';
import { ExerciseProvider } from 'components/ExerciseProvider/ExerciseProvider';

function Question() {
  const [result, setResult] = useState<string | undefined>(undefined);

  const { data: exercises, refetch } = useQuery(['quiz'], fetchExercise, { refetchOnWindowFocus: false });

  if (!(exercises && exercises[0])) {
    return <></>;
  }

  const exercise = exercises[0];

  const handleSubmit = (answers: string[]) => {
    if (result) {
      setResult(undefined);
      refetch();
    } else {
      if (answers[0] === exercise.choices[exercise.correct[0]]) setResult('success');
      else setResult('fail');
    }
  };

  if (!exercises) {
    return <Container />;
  }

  return (
    <Container maxW="4xl" centerContent pos="relative">
      <ExerciseProvider exercise={exercise}>
        <Text fontSize="2xl" mt={12}>
          <ExerciseText>{exercise.directive.prompt}</ExerciseText>
        </Text>
        <MultipleChoice exercise={exercise} onSubmit={handleSubmit} />
        <QuizResponse response={result} onTimeout={() => setResult(undefined)} />
      </ExerciseProvider>
    </Container>
  );
}

export default Question;
