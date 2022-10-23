-- CreateEnum
CREATE TYPE "DirectiveType" AS ENUM ('SELECT', 'SELECT_OR_FILL', 'ORDERED_SELECT', 'SHORT_ANSWER', 'LISTENING');

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "difficulty" DOUBLE PRECISION NOT NULL,
    "prompt" TEXT NOT NULL,
    "choices" TEXT[],
    "correct" INTEGER NOT NULL,
    "directiveId" INTEGER NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Directive" (
    "id" SERIAL NOT NULL,
    "prompt" TEXT NOT NULL,
    "type" "DirectiveType" NOT NULL,

    CONSTRAINT "Directive_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_directiveId_fkey" FOREIGN KEY ("directiveId") REFERENCES "Directive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
