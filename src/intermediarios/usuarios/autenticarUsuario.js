require('dotenv').config()
const jwt = require('jsonwebtoken')
const validarUsuario = require('../../repositorios/usuarios/validarUsuario')

const autenticarUsuario = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({
      mensagem:
        'Para acessar este recurso um token de autenticação válido deve ser enviado.',
    })
  }

  const token = authorization.split(' ')[1]
  try {
    if (!token) {
      return res.status(401).json({
        mensagem:
          'Para acessar este recurso um token de autenticação válido deve ser enviado.',
      })
    }
    const { id } = jwt.verify(token, process.env.JWT_KEY)

    const usuarioValido = await validarUsuario(id)

    if (!usuarioValido) {
      return res.status(401).json({ mensagem: 'Usuário não autenticado.' })
    }
    req.usuario_id = id
    next()
  } catch (error) {
    if (
      error.message === 'jwt malformed' ||
      error.message === 'invalid signature'
    ) {
      return res.status(401).json({ mensagem: 'Usuário não autenticado.' })
    }
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' })
  }
}

module.exports = autenticarUsuario
