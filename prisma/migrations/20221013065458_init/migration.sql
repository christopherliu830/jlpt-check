/*
  Warnings:

  - Added the required column `type` to the `Directive` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DirectiveType" AS ENUM ('MULTIPLE_CHOICE', 'SHORT_ANSWER', 'LISTENING');

-- AlterTable
ALTER TABLE "Directive" ADD COLUMN     "type" TEXT NOT NULL;
