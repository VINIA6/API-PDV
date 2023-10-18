const knex = require('../../config/conexao')

const cadastrarPedidoProdutoNoBanco = async (pedido_produto) => {
  await knex('pedido_produtos').insert(pedido_produto)
}

module.exports = cadastrarPedidoProdutoNoBanco
