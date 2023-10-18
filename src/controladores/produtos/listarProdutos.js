const listarProdutosPelaCategoriaNoBanco = require('../../repositorios/produtos/listarProdutoPelaCategoria')
const listarProdutosNoBanco = require('../../repositorios/produtos/listarProdutos')
const listarProdutos = async (req, res) => {
  const categoria_id = parseInt(req.query.categoria_id)

  try {
    if (categoria_id) {
      const produtos = await listarProdutosPelaCategoriaNoBanco(categoria_id)
      return res.status(200).json(produtos)
    }
    const produtos = await listarProdutosNoBanco()
    return res.status(200).json(produtos)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' })
  }
}

module.exports = listarProdutos
