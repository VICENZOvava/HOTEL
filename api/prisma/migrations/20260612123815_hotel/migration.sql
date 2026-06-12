/*
  Warnings:

  - You are about to drop the column `tipoQuarto` on the `reservas` table. All the data in the column will be lost.
  - Added the required column `dataEntrada` to the `Reservas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataSaida` to the `Reservas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Reservas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reservas` DROP COLUMN `tipoQuarto`,
    ADD COLUMN `dataEntrada` VARCHAR(191) NOT NULL,
    ADD COLUMN `dataSaida` VARCHAR(191) NOT NULL,
    ADD COLUMN `nome` VARCHAR(191) NOT NULL;
