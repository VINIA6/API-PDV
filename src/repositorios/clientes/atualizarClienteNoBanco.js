const knex = require('../../config/conexao')

const atualizarClienteNoBanco
 = async ({
  id, nome, email, cpf, cep, rua, numero, bairro, cidade, estado
}) => {
  await knex('clientes')
    .update({
      nome, email, cpf, cep, rua, numero, bairro, cidade, estado
    })
    .where({ id })
}

module.exports = atualizarClienteNoBanco

