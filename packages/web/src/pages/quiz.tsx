import React, { useState } from 'react';
import { Container } from '@chakra-ui/react';
import MultipleChoice from 'components/MultipleChoice/MultipleChoice';
import { fetchExercise } from 'api/exercise';
import { QuizResponse } from 'components/Quiz/QuizResponse';
import { useQuery } from 'react-query';
import { ExerciseProvider } from 'components/ExerciseProvider/ExerciseProvider';

function Question() {
  const [result, setResult] = useState<string | undefined>(undefined);

  const { data: exercises, refetch } = useQuery(['quiz'], fetchExercise, { refetchOnWindowFocus: false });

  if (!(exercises && exercises[0])) {
    return <></>;
  }

  const exercise = exercises[0];

  const handleRefetch = () => {
    setResult(undefined);
    refetch();
  };

  const handleSubmit = (answers: string[]) => {
    if (result) {
      handleRefetch();
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
        <MultipleChoice onSubmit={handleSubmit} />
        <QuizResponse response={result} onTimeout={handleRefetch} />
      </ExerciseProvider>
    </Container>
  );
}

export default Question;
