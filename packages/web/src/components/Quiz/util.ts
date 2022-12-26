import { estimateAbility } from 'utils/irt';
import { lerp } from 'utils/math';
import { Exercise } from 'utils/prisma';

export type QuizState = {
  questions: { [key: number]: { success: boolean } };
};

export type QuizEntry = {
  exercise: Exercise;
  answers: string[];
};

export type QuizHistory = QuizEntry[];

export function checkCorrect({ exercise, answers }: QuizEntry) {
  const corrects = exercise.correct.map((correctChoice) => exercise.choices[correctChoice]);
  const result = corrects.every((correct, idx) => answers[idx] === correct);
  return result;
}

export function getRating(quizHistory: QuizHistory) {
  const theta = estimateAbility(
    quizHistory.map((e) => (checkCorrect(e) ? 1 : 0)),
    quizHistory.map((e) => ({ a: 1, b: e.exercise.difficulty })),
    10
  );
  if (isFinite(theta)) {
    return theta;
  } else if (theta > 0) return 5;
  else return 1;
}

export function prepare(history: QuizHistory) {
  const state: QuizState = { questions: {} };
  for (const entry of history) {
    state.questions[entry.exercise.id] = { success: checkCorrect(entry) };
  }
  return state;
}

export async function fetchExercise(history: QuizHistory) {
  const response = await fetch('/api/exercise', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(prepare(history)),
  });
  const data = await response.json();
  return data as Exercise[];
}
