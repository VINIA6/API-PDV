const listarCategoriasNoBanco = require('../../repositorios/categorias/listarCategorias')

const existeCategoria = async (req, res, next) => {
  const { categoria_id } = req.body
  const categoria_id_valido = parseInt(categoria_id)
  const listarCategorias = await listarCategoriasNoBanco()
  const categoria = listarCategorias.find((categoria) => {
    return categoria.id === categoria_id_valido
  })

  if (!categoria) {
    return res
      .status(404)
      .json({ mensagem: 'Não existe categoria para o id informado' })
  }

  next()
}

module.exports = existeCategoria
