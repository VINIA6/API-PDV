require('dotenv').config()
const jwt = require('jsonwebtoken')

const verificaUsuarioValido = require('../../repositorios/usuarios/verificaUsuario')
const validarSenha = require('../../uteis/validarSenha')

const logarUsuario = async (req, res) => {
  const { email, senha } = req.body

  try {
    const usuario = await verificaUsuarioValido(email)
    if (!usuario) {
      return res
        .status(401)
        .json({ mensagem: 'Usuário e/ou senha inválido(s).' })
    }

    const senhaValida = await validarSenha(senha, usuario.senha)

    if (!senhaValida) {
      return res
        .status(401)
        .json({ mensagem: 'Usuário e/ou senha inválido(s).' })
    }
    const token = jwt.sign({ id: usuario.id }, process.env.JWT_KEY, {
      expiresIn: '15d',
    })

    const { senha: _, ...usuarioSemSenha } = usuario

    return res.status(200).json({ usuarioSemSenha, token })
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' })
  }
}

module.exports = logarUsuario
