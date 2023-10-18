const knex = require('../../config/conexao')

const alterarUsuarioNoBanco = async ({ nome, email, senhaEncriptada, id }) => {
  await knex('usuarios')
    .update({ nome, email, senha: senhaEncriptada })
    .where({ id })
  return true
}

module.exports = alterarUsuarioNoBanco
