const knex = require('../../config/conexao')

const validarUsuario = async (id) => {
  const usuario = await knex('usuarios').where({ id }).returning('*')

  return usuario[0]
}

module.exports = validarUsuario
