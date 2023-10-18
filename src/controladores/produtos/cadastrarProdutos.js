const publicarImagem = require('../../uteis/publicarImagem')
const cadastrarProdutoNoBanco = require('../../repositorios/produtos/cadastrarProdutoNoBanco')
const publicarImagemNoBanco = require('../../repositorios/produtos/publicarImagemNoBanco')

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body
  const quantidade_estoque_valido = parseInt(quantidade_estoque)
  const valor_valido = parseInt(valor)
  const categoria_id_valido = parseInt(categoria_id)

  try {
    let produto = await cadastrarProdutoNoBanco({
      descricao,
      quantidade_estoque_valido,
      valor_valido,
      categoria_id_valido,
    })

    if (req.file) {
      const { originalname, mimetype, buffer } = req.file
      const produto_imagem = await publicarImagem(
        `produtos/${produto[0].id}/${originalname}`,
        buffer,
        mimetype
      )

      produto = await publicarImagemNoBanco(produto_imagem.url, produto[0].id)
    }

    return res.status(201).json(produto[0])
  } catch (error) {
    return res.status(error.status).json({ mensagem: error.message })
  }
}

module.exports = cadastrarProduto
