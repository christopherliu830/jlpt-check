import { DirectiveType, PrismaClient, Prisma, Directive, Exercise as PrismaExercise } from '@lletter/jlpt-prisma';
export { DirectiveType, Prisma };
export type { Directive };

export type Exercise = PrismaExercise & {
  directive: Directive;
};

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
