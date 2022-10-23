import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const count = await prisma.exercise.count();
    const skip = Math.floor(Math.random() * count);

    const exercise = await prisma.exercise.findMany({
      take: 1,
      skip,
      include: { directive: true },
    });

    if (!exercise) {
      res.status(500).send({});
      return;
    }

    res.status(200).json(exercise);
  } else {
    res.status(405).send({});
  }
}
