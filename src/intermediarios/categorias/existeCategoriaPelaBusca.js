const listarCategoriasNoBanco = require('../../repositorios/categorias/listarCategorias')

const existeCategoriaPelaBusca = async (req, res, next) => {
  if (req.query.categoria_id) {
    const categoria_id = parseInt(req.query.categoria_id)
    const listarCategorias = await listarCategoriasNoBanco()
    const categoria = listarCategorias.find((categoria) => {
      return categoria.id === categoria_id
    })

    if (!categoria) {
      return res
        .status(404)
        .json({ mensagem: 'Não existe categoria para o id informado' })
    }
  }

  next()
}

module.exports = existeCategoriaPelaBusca
