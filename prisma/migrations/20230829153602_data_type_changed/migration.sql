/*
  Warnings:

  - Added the required column `year` to the `acamedic_semesters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "acamedic_semesters" ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "faculties" ALTER COLUMN "contactNo" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "students" ALTER COLUMN "contactNo" SET DATA TYPE TEXT;
