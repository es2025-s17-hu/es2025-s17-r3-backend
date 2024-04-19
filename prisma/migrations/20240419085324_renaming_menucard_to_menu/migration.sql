/*
  Warnings:

  - You are about to drop the column `menucardItemId` on the `orderitem` table. All the data in the column will be lost.
  - You are about to drop the `menucardcategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menucarditem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `menuItemId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `menucarditem` DROP FOREIGN KEY `MenucardItem_menucardCategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_menucardItemId_fkey`;

-- AlterTable
ALTER TABLE `orderitem` DROP COLUMN `menucardItemId`,
    ADD COLUMN `menuItemId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `menucardcategory`;

-- DropTable
DROP TABLE `menucarditem`;

-- CreateTable
CREATE TABLE `MenuCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `priority` DOUBLE NOT NULL DEFAULT -1.0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MenuItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT 'FOOD',
    `menuCategoryId` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MenuItem` ADD CONSTRAINT `MenuItem_menuCategoryId_fkey` FOREIGN KEY (`menuCategoryId`) REFERENCES `MenuCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_menuItemId_fkey` FOREIGN KEY (`menuItemId`) REFERENCES `MenuItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
