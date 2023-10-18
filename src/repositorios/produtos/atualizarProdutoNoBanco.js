const knex = require('../../config/conexao')

const atualizarProdutoNoBanco = async ({
  id,
  descricao,
  quantidade_estoque_valido,
  valor_valido,
  categoria_id_valido,
}) => {
  await knex('produtos')
    .update({
      descricao,
      quantidade_estoque: quantidade_estoque_valido,
      valor: valor_valido,
      categoria_id: categoria_id_valido,
    })
    .where({ id })
}

module.exports = atualizarProdutoNoBanco
