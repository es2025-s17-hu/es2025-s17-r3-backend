/*
  Warnings:

  - You are about to drop the column `deliveryVatId` on the `menucarditem` table. All the data in the column will be lost.
  - You are about to drop the column `onsiteVatId` on the `menucarditem` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `menucarditem` table. All the data in the column will be lost.
  - You are about to drop the column `pin` on the `user` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `menucarditem` DROP COLUMN `deliveryVatId`,
    DROP COLUMN `onsiteVatId`,
    DROP COLUMN `priority`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `pin`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;
