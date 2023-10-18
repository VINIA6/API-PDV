const listarPedidosNoBanco = require('../../repositorios/pedidos/listarPedidos')
const listarPedidosProdutosNoBanco = require('../../repositorios/pedidos/listarPedidoProdutos')
const listarPedidosClienteNoBanco = require('../../repositorios/pedidos/listarPedidosCliente')

const listarPedidos = async (req, res) => {
  const { cliente_id } = req.query
  try {
    const arrayPedidos = []
    let pedidos
    if (cliente_id) {
      pedidos = await listarPedidosClienteNoBanco(cliente_id)
    } else if (!cliente_id) {
      pedidos = await listarPedidosNoBanco()
    }

    for (let i = 0; i < pedidos.length; i++) {
      const pedidoProv = {}
      pedidoProv.pedido = pedidos[i]

      pedidoProv.pedido_produtos = []

      const pedido_produtos = await listarPedidosProdutosNoBanco(pedidos[i].id)

      pedidoProv.pedido_produtos.push(...pedido_produtos)

      arrayPedidos.push(pedidoProv)
    }

    return res.status(200).json(arrayPedidos)
  } catch (error) {
    return res.status(error.status).json({ mensagem: error.message })
  }
}

module.exports = listarPedidos
