const knex = require('../../config/conexao')

const publicarImagemNoBanco = async (produto_imagem, id) => {
  const produto = await knex('produtos')
    .update({ produto_imagem })
    .where({ id })
    .returning('*')

  return produto
}

module.exports = publicarImagemNoBanco
