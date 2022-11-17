import React, { useState } from 'react';
import { Container } from '@chakra-ui/react';
import MultipleChoice from 'components/MultipleChoice/MultipleChoice';
import { QuizResponse } from 'components/Quiz/QuizResponse';
import { ExerciseProvider } from 'components/ExerciseProvider/ExerciseProvider';

import { checkCorrect, QuizHistory } from 'api/exercise';
import { Directive, Exercise, Prisma, prisma } from 'utils/prisma';

function Question({ exercises }: { exercises: Exercise[] }) {
  const [quizHistory, setQuizHistory] = useState<QuizHistory>([]);
  const [exercise, setCurrentExercise] = useState<Exercise>(exercises[0]);

  if (!exercises?.[0]) {
    return <></>;
  }

  const refetch = () => {
    setCurrentExercise(exercises[Math.floor(Math.random() * exercises.length)]);
    console.log(exercises);
  };

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

export async function getStaticProps() {
  const exercises = await prisma.$queryRaw<Exercise[]>`
      SELECT *
      FROM "public"."Exercise"
      ORDER BY random()
    `;

  const directiveIds = Array.from(new Set(exercises.map((e) => e.directiveId)));
  const directives = await prisma.$queryRaw<Directive[]>`
      SELECT *
      FROM "public"."Directive"
      WHERE "public"."Directive"."id" IN (${Prisma.join(directiveIds)})
    `;

  exercises.forEach((exercise) => {
    const d = directives.find((directive) => directive.id === exercise.directiveId);
    if (!d) {
      throw new Error('Directive not found');
    }
    exercise.directive = d;
  });

  return {
    props: { exercises },
  };
}

export default Question;
