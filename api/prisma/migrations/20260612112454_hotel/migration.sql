-- CreateTable
CREATE TABLE `Quarto` (
    `numero` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`numero`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numeroQuarto` INTEGER NOT NULL,
    `tipoQuarto` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reservas` ADD CONSTRAINT `Reservas_numeroQuarto_fkey` FOREIGN KEY (`numeroQuarto`) REFERENCES `Quarto`(`numero`) ON DELETE RESTRICT ON UPDATE CASCADE;
