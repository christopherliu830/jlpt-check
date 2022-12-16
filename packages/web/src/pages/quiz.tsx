import React, { useState } from 'react';
import { Container } from '@chakra-ui/react';
import MultipleChoice from 'components/MultipleChoice/MultipleChoice';
import { QuizResponse } from 'components/Quiz/QuizResponse';
import { ExerciseProvider } from 'components/ExerciseProvider/ExerciseProvider';

import { checkCorrect, QuizHistory } from 'api/exercise';
import { DirectiveType, Exercise, prisma } from 'utils/prisma';
import { AnimatedProgressBar } from 'components/AnimatedProgress/AnimatedProgress';

function Question({ exercises }: { exercises: Exercise[] }) {
  const [quizHistory, setQuizHistory] = useState<QuizHistory>([]);
  const [exerciseIndex, setCurrentExerciseIndex] = useState(0);

  if (!exercises[exerciseIndex]) {
    return <></>;
  }

  const refetch = () => {
    setCurrentExerciseIndex(exerciseIndex + 1);
  };

  const exercise = exercises[exerciseIndex];

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
    <>
      <AnimatedProgressBar colorScheme="green" w="100%" max={exercises.length} value={exerciseIndex} />
      <Container maxW="4xl" centerContent pos="relative">
        <ExerciseProvider exercise={exercise}>
          <MultipleChoice onSubmit={handleSubmit} />
          <QuizResponse response={getResult()} onTimeout={refetch} />
        </ExerciseProvider>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  type PrismaReturn = Exercise & {
    directivePrompt: string;
    directiveType: DirectiveType;
  };

  // This difficult query is because we would like to order randomly the results
  // returned, which is not supported by prisma. (12/3/2022)
  // So the query is made and built randomly.
  const exercises: Exercise[] = (
    await prisma.$queryRaw<PrismaReturn[]>`
    SELECT exercise.*,
     directive.prompt as "directivePrompt",
     directive.type as "directiveType"
    FROM (
      SELECT
        ROW_NUMBER() OVER (PARTITION BY difficulty ORDER BY random()) AS r,
        prompt,
        *
      FROM
        "public"."Exercise"
    ) exercise
    INNER JOIN "public"."Directive" as directive
    ON exercise."directiveId" = directive.id
    WHERE exercise.r <= 1
  `
  ).map((e) => ({
    id: e.id,
    choices: e.choices,
    correct: e.correct,
    directiveId: e.directiveId,
    difficulty: e.difficulty,
    prompt: e.prompt,
    directive: {
      id: e.directiveId,
      prompt: e.directivePrompt,
      type: e.directiveType,
    },
  }));

  return {
    props: { exercises },
  };
}

export default Question;
