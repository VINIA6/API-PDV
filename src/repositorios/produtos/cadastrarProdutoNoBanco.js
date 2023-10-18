const knex = require('../../config/conexao')

const cadastrarProdutoNoBanco = async ({
  descricao,
  quantidade_estoque_valido,
  valor_valido,
  categoria_id_valido,
}) => {
  const produto = await knex('produtos')
    .insert({
      descricao,
      quantidade_estoque: quantidade_estoque_valido,
      valor: valor_valido,
      categoria_id: categoria_id_valido,
    })
    .returning('*')

  return produto
}

module.exports = cadastrarProdutoNoBanco
