const detalharCliente = async (req, res) => {
  try {
    return res.status(200).json(req.cliente)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' })
  }
}

module.exports = detalharCliente
