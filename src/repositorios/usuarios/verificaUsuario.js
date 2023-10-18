const knex = require('../../config/conexao')

const verificaUsuarioValido = async (email) => {
  const usuario = await knex('usuarios').where({ email })

  return usuario[0]
}

module.exports = verificaUsuarioValido
