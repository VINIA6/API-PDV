const bcrypt = require('bcrypt')
const cadastrarUsuarioNoBanco = require('../../repositorios/usuarios/cadastrarUsuarioNoBanco')

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body

  try {
    const senhaEncriptada = await bcrypt.hash(senha, 10)
    const usuario = await cadastrarUsuarioNoBanco({
      nome,
      email,
      senhaEncriptada,
    })
    return res.status(201).json(usuario)
  } catch (error) {
    return res.status(error.status).json({ mensagem: error.message })
  }
}

module.exports = cadastrarUsuario
