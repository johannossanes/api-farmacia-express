/*
  Warnings:

  - You are about to alter the column `preco` on the `medicamento` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(7,2)`.

*/
-- AlterTable
ALTER TABLE `medicamento` MODIFY `preco` DECIMAL(7, 2) NOT NULL;
