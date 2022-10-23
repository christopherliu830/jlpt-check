import { Directive, Exercise } from 'utils/prisma';

export type MultipleChoiceExercise = Exercise & {
  directive: Directive;
};

export async function fetchExercise() {
  const response = await fetch('/api/exercise', {
    method: 'POST',
  });
  const data = (await response.json()) as MultipleChoiceExercise[];
  return data;
}
