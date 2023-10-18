const knex = require('../../config/conexao')

const obterUsuario = async (id) => {
  const usuario = await knex('usuarios')
    .select(['id', 'nome', 'email'])
    .where({ id })

  return usuario[0]
}

module.exports = obterUsuario
