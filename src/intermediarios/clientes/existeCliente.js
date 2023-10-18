const buscarClienteId = require('../../repositorios/clientes/buscarClientePeloId')

const buscarCliente = async (req, res, next) => {
  let id
  req.params.id ? (id = req.params.id) : (id = req.body.cliente_id)
  if (isNaN(id)) {
    return res
      .status(400)
      .json({ mensagem: 'O id precisa ser um número válido' })
  }

  try {
    const cliente = await buscarClienteId(id)

    if (!cliente) {
      return res
        .status(404)
        .json({ mensagem: 'Não existe cliente cadastrado para o id informado' })
    }
    req.cliente = cliente
    next()
  } catch (error) {
    return res.status(error.status).json({ mensagem: error.message })
  }
}

module.exports = buscarCliente
