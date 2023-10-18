const existeProdutoPeloId = require('../../repositorios/produtos/existeProdutoPeloId')

const existeProdutoQuantidadePedido = async (req, res, next) => {
  const produtos = []

  const itensAgrupados = req.body.pedido_produtos.reduce(
    (valorTotal, pedidoAtual) => {
      let produto_id = pedidoAtual.produto_id
      let pedidoRepetido = valorTotal.find(
        (pedido) => pedido.produto_id === produto_id
      )

      if (pedidoRepetido)
        pedidoRepetido.quantidade_produto += pedidoAtual.quantidade_produto
      else valorTotal.push(pedidoAtual)

      return valorTotal
    },
    []
  )

  try {
    for (itemAgrupado of itensAgrupados) {
      const produto = await existeProdutoPeloId(itemAgrupado.produto_id)

      if (!produto) {
        return res.status(404).json({
          mensagem: 'Não existe produto cadastrado para o id informado',
        })
      }

      if (itemAgrupado.quantidade_produto > produto.quantidade_estoque) {
        return res
          .status(400)
          .json({ mensagem: 'Quantidade indisponível em estoque' })
      }
      produtos.push(produto)
    }

    req.produtos = produtos
    req.itensAgrupados = itensAgrupados

    next()
  } catch (error) {
    return res.status(error.status).json({ mensagem: error.message })
  }
}

module.exports = existeProdutoQuantidadePedido
