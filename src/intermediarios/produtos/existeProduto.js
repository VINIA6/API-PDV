const existeProdutoPeloId = require('../../repositorios/produtos/existeProdutoPeloId')

const existeProduto = async (req, res, next) => {
  const { id } = req.params
  if (isNaN(id)) {
    return res
      .status(400)
      .json({ mensagem: 'O id precisa ser um número válido' })
  }
  try {
    const produto = await existeProdutoPeloId(id)

    if (!produto) {
      return res
        .status(404)
        .json({ mensagem: 'Não existe produto cadastrado para o id informado' })
    }
    req.produto = produto
    next()
  } catch (error) {
    return res.status(error.status).json({ mensagem: error.message })
  }
}

module.exports = existeProduto
