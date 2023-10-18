const knex = require('../../config/conexao')

const cadastrarUsuarioNoBanco = async ({ nome, email, senhaEncriptada }) => {
  const usuario = await knex('usuarios')
    .insert({ nome, email, senha: senhaEncriptada })
    .returning(['id', 'nome', 'email'])

  return usuario[0]
}

module.exports = cadastrarUsuarioNoBanco
