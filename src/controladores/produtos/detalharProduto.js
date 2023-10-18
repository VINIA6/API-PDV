const detalharProduto = (req, res) => {
  return res.status(200).json(req.produto)
}

module.exports = detalharProduto
