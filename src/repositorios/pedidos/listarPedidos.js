const knex = require('../../config/conexao')

const listarPedidosNoBanco = async () => {
  const pedidos = await knex('pedidos').select('*')

  return pedidos
}

module.exports = listarPedidosNoBanco
