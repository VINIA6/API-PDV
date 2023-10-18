const knex = require('../../config/conexao')

const listarProdutosPelaCategoriaNoBanco = async (categoria_id) => {
  const produtos = knex('produtos').select('*').where({ categoria_id })
  return produtos
}

module.exports = listarProdutosPelaCategoriaNoBanco
