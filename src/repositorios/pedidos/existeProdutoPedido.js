const knex = require('../../config/conexao')

const existeProdutoPedidoNoBanco = async (id) => {
  const produto_pedido = await knex('pedido_produtos')
    .select('*')
    .where({ produto_id: id })

  return produto_pedido
}

module.exports = existeProdutoPedidoNoBanco
