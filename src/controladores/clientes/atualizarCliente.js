const atualizarClienteNoBanco = require('../../repositorios/clientes/atualizarClienteNoBanco')
const obterCliente = require('../../repositorios/clientes/detalharClientePeloId')
const {
  verificarClienteEmail,
  verificarClienteCpf,
} = require('../../repositorios/clientes/verificarCliente')

const atualizarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body
  const { id } = req.params

  try {
    const cliente = await obterCliente(id)
    if (email !== cliente.email) {
      const clienteIndisponivel = await verificarClienteEmail(email)
      if (clienteIndisponivel && clienteIndisponivel.id !== id) {
        return res.status(400).json({
          mensagem:
            'O e-mail informado já está sendo utilizado por outro cliente.',
        })
      }
    }
    if (cpf !== cliente.cpf) {
      const clienteIndisponivel = await verificarClienteCpf(cpf)
      if (clienteIndisponivel && clienteIndisponivel.id !== id) {
        return res.status(400).json({
          mensagem:
            'O CPF informado já está sendo utilizado por outro cliente.',
        })
      }
    }
    await atualizarClienteNoBanco({
      id,
      nome,
      email,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado,
    })

    return res.status(204).send()
  } catch (error) {
    return res.status(error.status).json({ mensagem: error.message })
  }
}

module.exports = atualizarCliente
