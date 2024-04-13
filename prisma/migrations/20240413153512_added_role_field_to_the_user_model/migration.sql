-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    MODIFY `active` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX `User_username_idx` ON `User`(`username`);
