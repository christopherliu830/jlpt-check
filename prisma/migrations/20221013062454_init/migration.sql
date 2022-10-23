/*
  Warnings:

  - Added the required column `directiveId` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "directiveId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Directive" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Directive_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_directiveId_fkey" FOREIGN KEY ("directiveId") REFERENCES "Directive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
