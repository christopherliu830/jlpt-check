import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await prisma.feedback.create({ data: { feedback: req.body }});
  }
  res.status(200).send({});
}