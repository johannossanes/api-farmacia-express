INSERT INTO cliente (nome, email, cidade, dataNasc) VALUES 
('José Silva', 'josesao@gmail.com', 'Pelotas-RS', '1994-03-04'),
('Ricarda Maria', 'mariazinha@gmail.com', 'Pelotas-RS', '1985-12-06'),
('Rosangelo Beatrizu', 'rosangelo@gmail.com', 'Capão do Leão-RS', '1974-02-05'),
('Talita Paulo', 'talitapaulo@gmail.com', 'Pelotas-RS', '1994-03-12');

-- model Cliente {
--   id          Int       @id @default(autoincrement())
--   nome        String    @db.VarChar(50)
--   email       String    @db.VarChar(120)
--   cidade      String    @db.VarChar(50)
--   dataNasc    DateTime 
--   vendas      Venda[]
--   @@map("cliente")
-- }
