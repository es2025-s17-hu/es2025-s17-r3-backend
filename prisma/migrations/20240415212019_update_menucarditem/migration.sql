/*
  Warnings:

  - You are about to drop the column `discount` on the `MenucardItem` table. All the data in the column will be lost.
  - You are about to drop the column `serviceFee` on the `MenucardItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `MenucardItem` DROP COLUMN `discount`,
    DROP COLUMN `serviceFee`;
