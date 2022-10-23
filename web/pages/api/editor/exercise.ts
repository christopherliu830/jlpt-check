import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma, DirectiveType } from '../../../src/utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Delete all questions
    await prisma.exercise.deleteMany({});
    await prisma.directive.deleteMany({});

    // Create sample question - Multiple Choice
    await prisma.directive.create({
      data: {
        prompt: 'Select the correct reading from the underlined word',
        type: DirectiveType.SELECT,
        exercises: {
          createMany: {
            data: [
              {
                difficulty: 5,
                prompt: '去年より<u>利益</u>がわずかに増えた。',
                choices: ['りし', 'りそく', 'りえき', 'りじゅん'],
                correct: 2,
              },
              {
                difficulty: 5,
                prompt: '橋本選手の活躍で、なんとかピンチ<u>逃れた</u>。',
                choices: ['のがれた', 'はなれた', 'それた', 'まぬがれた'],
                correct: 0,
              },
            ],
          },
        },
      },
    });

    res.status(200).send({});
  } catch (error) {
    console.log(error);
    res.status(500).send({});
  }
}
