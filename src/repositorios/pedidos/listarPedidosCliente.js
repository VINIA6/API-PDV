const knex = require('../../config/conexao')

const listarPedidosClienteNoBanco = async (cliente_id) => {
  const pedidos = await knex('pedidos').select('*').where({ cliente_id })

  return pedidos
}

module.exports = listarPedidosClienteNoBanco
