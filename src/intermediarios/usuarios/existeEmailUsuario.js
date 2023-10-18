const verificaUsuarioValido = require('../../repositorios/usuarios/verificaUsuario')

const existeEmailUsuario = async (req, res, next) => {
  const { email } = req.body

  const usuarioIndisponivel = await verificaUsuarioValido(email)

  if (usuarioIndisponivel) {
    return res.status(400).json({
      mensagem: 'Já existe usuário cadastrado com o e-mail informado.',
    })
  }
  next()
}

module.exports = existeEmailUsuario
