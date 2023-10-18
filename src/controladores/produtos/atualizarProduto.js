const atualizarProdutoNoBanco = require('../../repositorios/produtos/atualizarProdutoNoBanco')
const excluirImagem = require('../../uteis/excluirImagem')
const publicarImagem = require('../../uteis/publicarImagem')
const publicarImagemNoBanco = require('../../repositorios/produtos/publicarImagemNoBanco')

const atualizarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body
  const { id } = req.params
  produto = req.produto
  const quantidade_estoque_valido = parseInt(quantidade_estoque)
  const valor_valido = parseInt(valor)
  const categoria_id_valido = parseInt(categoria_id)

  try {
    await atualizarProdutoNoBanco({
      id,
      descricao,
      quantidade_estoque_valido,
      valor_valido,
      categoria_id_valido,
    })
    if (req.file) {
      const { originalname, mimetype, buffer } = req.file

      if (produto.produto_imagem) {
        await excluirImagem(produto.produto_imagem.split('.com/')[1])
      }

      const produto_imagem = await publicarImagem(
        `produtos/${produto.id}/${originalname}`,
        buffer,
        mimetype
      )

      produto = await publicarImagemNoBanco(produto_imagem.url, produto.id)
    }

    return res.status(204).send()
  } catch (error) {
    return res.status(error.status).json({ mensagem: error.message })
  }
}

module.exports = atualizarProduto
