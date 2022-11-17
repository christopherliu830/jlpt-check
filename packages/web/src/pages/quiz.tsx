import React, { useState } from 'react';
import { Container } from '@chakra-ui/react';
import MultipleChoice from 'components/MultipleChoice/MultipleChoice';
import { QuizResponse } from 'components/Quiz/QuizResponse';
import { useQuery } from 'react-query';
import { ExerciseProvider } from 'components/ExerciseProvider/ExerciseProvider';

import { checkCorrect, fetchExercise, QuizHistory } from 'api/exercise';

function Question() {
  const [quizHistory, setQuizHistory] = useState<QuizHistory>([]);

  const { data: exercises, refetch } = useQuery(['quiz'], () => fetchExercise(quizHistory), {
    refetchOnWindowFocus: false,
  });

  if (!exercises?.[0]) {
    return <></>;
  }

  const exercise = exercises[0];

  const getResult = () => {
    const lastAnswered = quizHistory[quizHistory.length - 1];
    // If the last answered question is the current question (i.e. user just answered the question)
    if (lastAnswered?.exercise.id === exercise.id) {
      return checkCorrect(lastAnswered) ? 'success' : 'fail';
    } else {
      return undefined;
    }
  };

  const handleSubmit = (answers: string[]) => {
    if (getResult()) {
      refetch();
      return;
    }

    setQuizHistory((old) => [...old, { exercise, answers }]);
  };

  return (
    <Container maxW="4xl" centerContent pos="relative">
      <ExerciseProvider exercise={exercise}>
        <MultipleChoice onSubmit={handleSubmit} />
        <QuizResponse response={getResult()} onTimeout={refetch} />
      </ExerciseProvider>
    </Container>
  );
}

export default Question;
