const bcrypt = require('bcrypt')
const verificaUsuarioValido = require('../../repositorios/usuarios/verificaUsuario')
const alterarUsuarioNoBanco = require('../../repositorios/usuarios/alteracaoDeUsuarioNoBanco')
const obterUsuario = require('../../repositorios/usuarios/obterUsuario')

const atualizarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body
  const id = req.usuario_id
  const usuario = await obterUsuario(id)
  try {
    if (email !== usuario.email) {
      const usuarioIndisponivel = await verificaUsuarioValido(email)
      if (usuarioIndisponivel && usuarioIndisponivel.id !== id) {
        return res.status(400).json({
          mensagem:
            'O e-mail informado já está sendo utilizado por outro usuário.',
        })
      }
    }
    const senhaEncriptada = await bcrypt.hash(senha, 10)
    await alterarUsuarioNoBanco({ nome, email, senhaEncriptada, id })
    return res.status(204).send()
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' })
  }
}

module.exports = atualizarUsuario
