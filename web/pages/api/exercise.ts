import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../src/utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const exercise = await prisma.exercise.findFirst();
    res.status(200).json(exercise);
  } else {
    res.status(405).send({});
  }
}
