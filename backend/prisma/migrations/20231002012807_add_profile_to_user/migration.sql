-- AlterTable
ALTER TABLE `user` ADD COLUMN `profile` ENUM('user', 'moderator', 'admin') NOT NULL DEFAULT 'user';
