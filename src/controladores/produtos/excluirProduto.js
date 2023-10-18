const excluirProdutoNoBanco = require('../../repositorios/produtos/excluirProdutoNoBanco')
const excluirImagem = require('../../uteis/excluirImagem')

const excluirProduto = async (req, res) => {
  const { id } = req.params
  produto = req.produto
  try {
    await excluirProdutoNoBanco(id)

    if (produto.produto_imagem) {
      await excluirImagem(produto.produto_imagem.split('.com/')[1])
    }

    return res.status(200).json({ mensagem: 'Produto excluído com sucesso' })
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' })
  }
}

module.exports = excluirProduto
