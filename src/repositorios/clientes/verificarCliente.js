const knex = require('../../config/conexao')

const verificarClienteEmail = async (email) => {
  const usuario = await knex('clientes').where({ email })

  return usuario[0]
}

const verificarClienteCpf = async (cpf) => {
  const usuario = await knex('clientes').where({ cpf })

  return usuario[0]
}

module.exports = { verificarClienteEmail, verificarClienteCpf }
