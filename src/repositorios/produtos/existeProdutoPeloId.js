const knex = require('../../config/conexao')

const existeProdutoPeloId = async (id) => {
  produto = await knex('produtos').where({ id }).returning('*')

  return produto[0]
}

module.exports = existeProdutoPeloId
