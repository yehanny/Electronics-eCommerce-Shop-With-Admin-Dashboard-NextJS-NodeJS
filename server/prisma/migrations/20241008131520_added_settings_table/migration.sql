-- CreateTable
CREATE TABLE `Settings` (
    `id` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL, 
    `mainColor` VARCHAR(191) NOT NULL, 
    `secondaryColor` VARCHAR(191) NOT NULL, 
    `language` VARCHAR(191) NOT NULL DEFAULT 'en',
    `companyPhone` VARCHAR(191) NOT NULL, 
    `companyEmail` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)

) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Settings` ADD CONSTRAINT `Settings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
