const cadastrarClienteNoBanco = require('../../repositorios/clientes/cadastrarClienteNoBanco')

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body

  try {
    const usuario = await cadastrarClienteNoBanco({
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
    return res.status(201).json(usuario)
  } catch (error) {
    return res.status(error.status).json({ mensagem: error.message })
  }
}

module.exports = cadastrarCliente
