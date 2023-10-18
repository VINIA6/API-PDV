const knex = require('../../config/conexao')

const listarPedidosProdutosNoBanco = async (id) => {
  const pedido_produtos = await knex('pedido_produtos')
    .select('*')
    .where({ pedido_id: id })

  return pedido_produtos
}

module.exports = listarPedidosProdutosNoBanco
