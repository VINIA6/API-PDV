const buscarClienteId = require('../../repositorios/clientes/buscarClientePeloId')
const cadastrarPedidoNoBanco = require('../../repositorios/pedidos/cadastrarPedido')
const cadastrarPedidoProdutoNoBanco = require('../../repositorios/pedidos/cadastrarPedidoProduto')
const atualizarQuantidadeProdutoEstoque = require('../../repositorios/produtos/atualizarQuantidadeEstoque')
const enviarEmail = require('../../uteis/envioEmail')

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao } = req.body

  try {
    const valor_total = req.itensAgrupados.reduce((total, itemAgrupado) => {
      const produto = req.produtos.find((p) => p.id === itemAgrupado.produto_id)
      return total + produto.valor * itemAgrupado.quantidade_produto
    }, 0)

    const pedido = {
      observacao,
      valor_total,
      cliente_id,
    }
    const pedidoCadastrado = await cadastrarPedidoNoBanco(pedido)

    const pedido_produtos = { pedido_id: pedidoCadastrado.id }

    for (itemAgrupado of req.itensAgrupados) {
      const produto = req.produtos.find((p) => p.id === itemAgrupado.produto_id)

      pedido_produtos.quantidade_produto = itemAgrupado.quantidade_produto
      pedido_produtos.valor_produto = produto.valor
      pedido_produtos.produto_id = produto.id

      await cadastrarPedidoProdutoNoBanco(pedido_produtos)
      await atualizarQuantidadeProdutoEstoque(
        itemAgrupado.quantidade_produto,
        produto.id
      )
    }
    const cliente = await buscarClienteId(cliente_id)

    await enviarEmail(cliente.nome, cliente.email)

    return res.status(204).send()
  } catch (error) {
    return res.status(error.status).json({ mensagem: error.message })
  }
}

module.exports = cadastrarPedido
