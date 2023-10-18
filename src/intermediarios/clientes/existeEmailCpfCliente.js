const {
  verificarClienteEmail,
  verificarClienteCpf,
} = require('../../repositorios/clientes/verificarCliente')

const existeClienteCadastrado = async (req, res, next) => {
  try {
    const { email, cpf } = req.body

    const usuarioIndisponivelEmail = await verificarClienteEmail(email)

    if (usuarioIndisponivelEmail) {
      return res.status(400).json({
        mensagem: 'Já existe cliente cadastrado com o e-mail informado.',
      })
    }

    const usuarioIndisponivelCpf = await verificarClienteCpf(cpf)

    if (usuarioIndisponivelCpf) {
      return res
        .status(400)
        .json({ mensagem: 'Já existe cliente cadastrado com o CPF informado.' })
    }
    next()
  } catch (error) {
    return res.status(error.status).json({ mensagem: error.message })
  }
}

module.exports = existeClienteCadastrado
