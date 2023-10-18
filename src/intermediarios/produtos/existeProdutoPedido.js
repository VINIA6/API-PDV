const existeProdutoPedidoNoBanco = require('../../repositorios/pedidos/existeProdutoPedido')
const existeProdutoPedido = async (req, res, next) => {
  const { id } = req.params
  try {
    const produto = await existeProdutoPedidoNoBanco(id)

    if (produto.length > 0) {
      return res.status(400).json({
        mensagem: 'Proibida a exclusão de um produto vinculado a um pedido',
      })
    }

    next()
  } catch (error) {
    return res.status(error.status).json({ mensagem: error.message })
  }
}

module.exports = existeProdutoPedido
