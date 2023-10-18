const knex = require('../../config/conexao')

const cadastrarClienteNoBanco = async ({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado }) => {
  const usuario = await knex('clientes')
    .insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
    .returning(['*'])

  return usuario[0]
}

module.exports =  cadastrarClienteNoBanco 
