## Controle de Vendas Farmácia 

Você foi contratado para criar uma API para controlar as vendas dos medicamentos de uma farmácia.
A API deve manipular as seguintes models (tabelas):

☑️ Medicamento(s): contendo atributos como: id, nome, laboratorio, preco, controlado (sim/não), quantidade e
quantMinima (que é o ponto de reposição).

☑️ Cliente(s): contendo atributos como: id, nome, email, cidade, dataNasc ...

☑️ Venda(s): contendo atributos como: id, clienteId, data, total (inicialmente 0).

☑️ ItemVenda(s): contendo os atributos como: id, vendaId, produtoId, quantidade e preco

☑️ Crie os arquivos (e rotas) para realizar o CRUD dos medicamentos, vendas e itens da venda.

☑️ Teste o funcionamento das transações.

☑️ A transação deve envolver a inclusão de um item da venda, que deve atualizar a quantidade em estoque e
aumentar o total da nota (venda).- Defina as models e rode a migration e o generate.

☑️ Insira (via MySQL) 3 ou 4 registros na tabela de clientes.

☑️ Crie uma rota para enviar um e-mail para o cliente, que receba como parâmetro na URL o id da venda e
construa uma tabela HTML com os itens vendidos ao cliente (deste id/nota) enviando-a no corpo do e-mail.
Ou seja, nossa API vai permitir enviar para o e-mail do cliente a nota da venda.

☑️ Crie uma rota para listar apenas os medicamentos que estão com estoque igual ou abaixo da quantidade
mínima. Ordene a lista para exibir os medicamentos que estão com maior necessidade de reposição primeiro


## Legendas 

☑️ -> Implementado 

🟡 -> Ainda falta implementar 
