import { toLookup } from 'utils/array';
import { DirectiveType, Exercise, prisma } from 'utils/prisma';

export { Quiz as default } from 'components/Quiz/Quiz';

export async function getServerSideProps() {
  // Merged type returned by the query below. (I don't know how to make nested JSON returns)
  type PrismaReturn = Exercise & {
    directivePrompt: string;
    directiveType: DirectiveType;
  };

  // This difficult query is because we would like to order randomly the results
  // returned, which is not supported by prisma. (12/3/2022)
  // So the query is made and built randomly.
  // Returns N each questions of every difficulty where exercise.r <= N
  const exercises: Exercise[] = (
    await prisma.$queryRaw<PrismaReturn[]>`
    SELECT exercise.*,
     directive.prompt as "directivePrompt",
     directive.type as "directiveType"
    FROM (
      SELECT
        ROW_NUMBER() OVER (PARTITION BY difficulty ORDER BY random()) AS r,
        prompt,
        *
      FROM
        "public"."Exercise"
    ) exercise
    INNER JOIN "public"."Directive" as directive
    ON exercise."directiveId" = directive.id
    WHERE exercise.r <= 15
  `
  )
    // Remap the returned results to the correct type.
    .map((e) => ({
      id: e.id,
      choices: e.choices,
      correct: e.correct,
      directiveId: e.directiveId,
      difficulty: e.difficulty,
      prompt: e.prompt,
      directive: {
        id: e.directiveId,
        prompt: e.directivePrompt,
        type: e.directiveType,
      },
    }));

  const lookup = toLookup(exercises, (e) => e.difficulty);

  return {
    props: { exercises: lookup },
  };
}
