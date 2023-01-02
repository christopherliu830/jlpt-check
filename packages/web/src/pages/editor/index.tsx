import { prisma } from 'utils/prisma';

export { Editor as default } from 'components/Editor/Editor';

export async function getServerSideProps() {
  const exercises = await prisma.exercise.findMany({ include: { directive: true }});
  return {
    props: { exercises }
  }
}