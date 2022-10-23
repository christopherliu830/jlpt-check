import fs from 'fs';
import path from 'path';
import assert from 'assert';
import yaml from 'js-yaml';
import { PrismaClient, DirectiveType } from '../prisma/generated/client/index.js'; 

const prisma = new PrismaClient();

const exercisePath = fs.readdirSync('exercises');

// Build Directives
const directives = yaml.load(fs.readFileSync('directives.yml', 'utf-8'));

for(const fileName of exercisePath) {
  const groupedExercises = yaml.load(fs.readFileSync(`exercises/${fileName}`, 'utf-8'));
  for(const group of groupedExercises) {
    const directive = directives.find(d => d.key === group.directive) 
    group.exercises.forEach(e => {
      e.fileName = fileName
      if (typeof e.correct === 'number') {
        e.correct = [e.correct]
      }
    });
    directive.exercises = directive.exercises 
      ? [...directive.exercises, ...group.exercises]
      : group.exercises
  }
}

await prisma.exercise.deleteMany();
await prisma.directive.deleteMany();

for(const directive of directives) {

  for(const exercise of directive.exercises) {
    if (!validate(exercise)) {
      throw new Error(JSON.stringify(exercise, null, 2));
    }
  }

  await prisma.directive.create({
    data: {
      prompt: directive.prompt,
      type: Object.values(DirectiveType)[directive.type],
      exercises: {
        createMany: { data: directive.exercises.map(e => ({
          difficulty: e.difficulty,
          prompt: e.prompt,
          choices: e.choices,
          correct: e.correct
        }))}
      }
    }
  })
}

function validate(exercise) {
  return (
    typeof exercise.difficulty === 'number' &&
    typeof exercise.prompt === 'string' &&
    Array.isArray(exercise.choices) &&
    Array.isArray(exercise.correct) &&
    typeof exercise.correct[0] === 'number'
  );
}