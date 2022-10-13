/*
  Warnings:

  - You are about to drop the column `level` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Exercise` table. All the data in the column will be lost.
  - Added the required column `difficulty` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "level",
DROP COLUMN "type",
ADD COLUMN     "difficulty" DOUBLE PRECISION NOT NULL;
