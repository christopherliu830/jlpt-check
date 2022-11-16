import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const directives = await prisma.directive.findMany({});
  res.status(200).json(directives);
}
