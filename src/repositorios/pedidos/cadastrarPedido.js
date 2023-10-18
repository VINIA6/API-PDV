const knex = require('../../config/conexao')

const cadastrarPedidoNoBanco = async (pedido) => {
  const pedidoCadastrado = await knex('pedidos').insert(pedido).returning('*')

  return pedidoCadastrado[0]
}

module.exports = cadastrarPedidoNoBanco
