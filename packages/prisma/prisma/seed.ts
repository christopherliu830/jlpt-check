import { PrismaClient, DirectiveType } from '@prisma/client';
import { directives } from '@lletter/jlpt-exams';

const prisma = new PrismaClient();

(async () => {
  await prisma.exercise.deleteMany();
  await prisma.directive.deleteMany();

  for (const directive of directives) {
    await prisma.directive.create({
      data: {
        prompt: directive.prompt,
        type: Object.values(DirectiveType)[directive.type],
        exercises: {
          createMany: {
            data:
              directive.exercises?.map((e) => ({
                difficulty: e.difficulty,
                prompt: e.prompt,
                choices: e.choices,
                correct: e.correct,
              })) ?? [],
          },
        },
      },
    });
  }
})();
