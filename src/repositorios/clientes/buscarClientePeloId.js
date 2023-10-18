const knex = require('../../config/conexao')

const buscarClienteId = async (id) => {
  cliente = await knex('clientes').where({ id })

  return cliente[0]
}

module.exports = buscarClienteId
