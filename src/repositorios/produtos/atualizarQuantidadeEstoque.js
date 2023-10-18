const knex = require('../../config/conexao')

const atualizarQuantidadeProdutoEstoque = async (quantidade, id) => {
  await knex('produtos')
    .update({
      quantidade_estoque: knex.raw(`quantidade_estoque - ${quantidade}`),
    })
    .where({ id })
}

module.exports = atualizarQuantidadeProdutoEstoque
