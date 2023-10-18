const knex = require('../../config/conexao')

const listarProdutosNoBanco = async () => {
  const produtos = knex('produtos').select('*')
  return produtos
}

module.exports = listarProdutosNoBanco
