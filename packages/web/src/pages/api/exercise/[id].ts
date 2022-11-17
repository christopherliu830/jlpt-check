import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id: exerciseId } = req.query;
  const id = parseInt(exerciseId as string);
  const exercise = await prisma.exercise.findUnique({
    where: { id },
    include: { directive: true },
  });

  res.status(200).json([exercise]);
}
