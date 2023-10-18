const knex = require('../../config/conexao')

const listarCategoriasNoBanco = async () => {
  const categorias = await knex.select('*').from('categorias')
  return categorias
}

module.exports = listarCategoriasNoBanco
