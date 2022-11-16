import { Exercise } from 'utils/prisma';

export async function fetchExercise() {
  const response = await fetch('/api/exercise', {
    method: 'POST',
  });
  const data = (await response.json()) as Exercise[];
  return data;
}
