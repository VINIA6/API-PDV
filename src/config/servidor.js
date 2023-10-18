const express = require('express')
const rotas = require('../rotas/rotas')

const app = express()

app.use(express.json())

app.use(rotas)
app.all('*', (req, res) => {
  return res.status(404).json({
    mensagem: 'Verifique se o endereço da página foi digitado corretamente.',
  })
})
module.exports = app
