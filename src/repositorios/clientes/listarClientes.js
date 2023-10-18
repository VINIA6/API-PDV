const knex = require('../../config/conexao')

const listarClientesNoBanco = async () => {
  const clientes = await knex.select('*').from('clientes')
  return clientes
}

module.exports = listarClientesNoBanco
