const knex = require('../../config/conexao')

const excluirProdutoNoBanco = async (id) => {
  await knex('produtos').where({ id }).del()
}

module.exports = excluirProdutoNoBanco
