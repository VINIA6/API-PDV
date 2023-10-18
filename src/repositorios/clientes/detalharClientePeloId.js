const knex = require('../../config/conexao')

const obterCliente = async (id) => {
  cliente = await knex('clientes').where({ id }).returning('*')

  return cliente[0]
}

module.exports = obterCliente
