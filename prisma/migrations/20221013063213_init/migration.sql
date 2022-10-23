/*
  Warnings:

  - The `content` column on the `Exercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `prompt` to the `Directive` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Directive" ADD COLUMN     "prompt" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "content",
ADD COLUMN     "content" JSONB;
