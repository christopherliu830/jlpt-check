import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, prisma, Exercise, Directive } from 'utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { questions } = req.body;

    const exercises = await prisma.$queryRaw<Exercise[]>`
      SELECT *
      FROM "public"."Exercise"
      ORDER BY random()
    `;

    const directiveIds = Array.from(new Set(exercises.map((e) => e.directiveId)));
    const directives = await prisma.$queryRaw<Directive[]>`
      SELECT *
      FROM "public"."Directive"
      WHERE "public"."Directive"."id" IN (${Prisma.join(directiveIds)})
    `;

    exercises.forEach((exercise) => {
      const d = directives.find((directive) => directive.id === exercise.directiveId);
      if (!d) {
        throw new Error('Directive not found');
      }
      exercise.directive = d;
    });

    if (!exercises) {
      res.status(500).send({});
      return;
    }

    res.status(200).json(exercises);
  } else {
    res.status(405).send({});
  }
}
