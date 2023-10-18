const listarClientesNoBanco = require('../../repositorios/clientes/listarClientes')

const listarClientes = async (req, res) => {
  try {
    return res.status(200).json(await listarClientesNoBanco())
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' })
  }
}

module.exports = listarClientes
