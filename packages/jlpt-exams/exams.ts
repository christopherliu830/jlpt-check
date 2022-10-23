import yaml from 'js-yaml';
import fs from 'fs';

type Exercise = {
  difficulty: number;
  prompt: string;
  choices: string[];
  correct: number[];
  fileName?: string;
};
type GroupedExercises = {
  directive: string;
  exercises: Exercise[];
};

type Directive = {
  key: string;
  prompt: string;
  type: number;
  exercises?: Exercise[];
};

const exercisePath = fs.readdirSync('exercises');

// Build Directives
const directives = yaml.load(fs.readFileSync('directives.yml', 'utf-8')) as Directive[];

for (const fileName of exercisePath) {
  const groupedExercises = yaml.load(fs.readFileSync(`exercises/${fileName}`, 'utf-8'));
  for (const group of groupedExercises as GroupedExercises[]) {
    const directive = directives.find((d) => d.key === group.directive);
    if (!directive) {
      continue;
    }

    group.exercises.forEach((e) => {
      e.fileName = fileName;
      if (typeof e.correct === 'number') {
        e.correct = [e.correct];
      }
    });
    directive.exercises = directive.exercises ? [...directive.exercises, ...group.exercises] : group.exercises;
  }
}

for (const directive of directives) {
  if (!directive.exercises) {
    continue;
  }

  for (const exercise of directive.exercises) {
    if (!validate(exercise)) {
      throw new Error(JSON.stringify(exercise, null, 2));
    }
  }
}

function validate(exercise: Exercise) {
  return (
    typeof exercise.difficulty === 'number' &&
    typeof exercise.prompt === 'string' &&
    Array.isArray(exercise.choices) &&
    Array.isArray(exercise.correct) &&
    typeof exercise.correct[0] === 'number'
  );
}

export { directives };
