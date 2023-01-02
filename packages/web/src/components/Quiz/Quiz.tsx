import React, { useEffect, useState } from 'react';

import { Container } from '@chakra-ui/react';

import MultipleChoice from 'components/MultipleChoice/MultipleChoice';
import { QuizResponse } from 'components/Quiz/QuizResponse';
import { ExerciseProvider } from 'components/ExerciseProvider/ExerciseProvider';
import { AnimatedProgressBar } from 'components/AnimatedProgress/AnimatedProgress';

import { useRouter } from 'next/router';

import { checkCorrect } from './util';

import type { Exercise } from 'utils/prisma';
import { useQuiz } from './QuizProvider';
import { clamp } from 'utils/math';
import Head from 'next/head';

export function Quiz({ exercises }: { exercises: Record<number, Exercise[]> }) {
  const router = useRouter();

  const { quizHistory, setQuizHistory } = useQuiz();

  const [answered, setAnswered] = useState<Record<number, number>>(
    Object.fromEntries(Object.keys(exercises).map((difficulty) => [difficulty, -1]))
  );

  useEffect(() => {
    setQuizHistory([]);
  }, [exercises]);

  /**
   * Current estimated rating. (1 = easy, 5 = hard)
   */
  const [rating, setRating] = useState(1);

  const exercise = exercises[rating][answered[rating] + 1];

  // Get the result of the last answer (success or fail).
  // Returns undefined if the question wasn't answered yet.
  function parseResult(): 'success' | 'fail' | undefined {
    const lastAnswered = quizHistory[quizHistory.length - 1];
    // If the last answered question is the current question (i.e. user just answered the question)
    if (lastAnswered?.exercise.id === exercise.id) {
      return checkCorrect(lastAnswered) ? 'success' : 'fail';
    } else {
      return undefined;
    }
  }

  const nextExercise = () => {
    const move = parseResult() === 'success' ? 1 : -1;
    setRating(clamp(rating + move, 1, 5));

    // Increment the answered difficulty so the next query will get the next exercise.
    setAnswered((old) => ({
      ...old,
      [exercise.difficulty]: old[exercise.difficulty] + 1,
    }));

    // If end of quiz, go to /results
    if (quizHistory.length === exercises[1].length) {
      router.push('/results');
    }
  };

  const handleSubmit = (answers: string[]) => {
    if (parseResult()) {
      nextExercise();
    } else {
      // Add the exercise + answer to the history
      setQuizHistory((old) => [...old, { exercise, answers }]);
    }
  };

  return (
    <>
      <Head><title>JLPTCheck Quiz</title></Head>
      <AnimatedProgressBar colorScheme="green" w="100%" max={exercises[1].length} value={quizHistory.length} />
      <Container maxW="4xl" centerContent pos="relative">
        <ExerciseProvider exercise={exercise}>
          <MultipleChoice onSubmit={handleSubmit} />
          <QuizResponse response={parseResult()} onTimeout={nextExercise} />
        </ExerciseProvider>
      </Container>
    </>
  );
}
