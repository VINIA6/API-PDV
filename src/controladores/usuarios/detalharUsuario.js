const obterUsuario = require('../../repositorios/usuarios/obterUsuario')

const detalharUsuario = async (req, res) => {
  const { usuario_id } = req
  try {
    const usuario = await obterUsuario(usuario_id)
    return res.status(200).json(usuario)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' })
  }
}

module.exports = detalharUsuario
