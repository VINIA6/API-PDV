const express = require('express')
const multer = require('../config/multer')

const schemaUsuario = require('../validacoes/schemaUsuario')
const schemaLogin = require('../validacoes/schemaLogin')
const schemaProduto = require('../validacoes/schemaProduto')
const schemaCliente = require('../validacoes/schemaCliente')
const schemaPedido = require('../validacoes/schemaPedido')

const existeEmailUsuario = require('../intermediarios/usuarios/existeEmailUsuario')
const autenticarUsuario = require('../intermediarios/usuarios/autenticarUsuario')
const existeCliente = require('../intermediarios/clientes/existeCliente')
const validarCorpoRequisicao = require('../intermediarios/validarCorpoRequisicao')
const existeProduto = require('../intermediarios/produtos/existeProduto')
const existeCategoria = require('../intermediarios/categorias/existeCategoria')
const existeCategoriaPelaBusca = require('../intermediarios/categorias/existeCategoriaPelaBusca')
const existeClienteCadastrado = require('../intermediarios/clientes/existeEmailCpfCliente')
const existeProdutoQuantidadePedido = require('../intermediarios/pedidos/existeProdutoQuantidadePedido')
const existeProdutoPedido = require('../intermediarios/produtos/existeProdutoPedido')

const cadastrarUsuario = require('../controladores/usuarios/cadastrarUsuario')
const logarUsuario = require('../controladores/usuarios/logarUsuario')
const detalharUsuario = require('../controladores/usuarios/detalharUsuario')
const atualizarUsuario = require('../controladores/usuarios/atualizarUsuario')

const listarCategorias = require('../controladores/categorias/listarCategorias')

const cadastrarProduto = require('../controladores/produtos/cadastrarProdutos')
const atualizarProduto = require('../controladores/produtos/atualizarProduto')
const excluirProduto = require('../controladores/produtos/excluirProduto')
const listarProdutos = require('../controladores/produtos/listarProdutos')
const detalharProduto = require('../controladores/produtos/detalharProduto')

const cadastrarCliente = require('../controladores/clientes/cadastrarCliente')
const detalharCliente = require('../controladores/clientes/detalharCliente')
const listarClientes = require('../controladores/clientes/listarClientes')
const atualizarCliente = require('../controladores/clientes/atualizarCliente')

const cadastrarPedido = require('../controladores/pedido/cadastrarPedido')
const listarPedidos = require('../controladores/pedido/listarPedidos')

const rotas = express()

rotas.post(
  '/usuario',
  validarCorpoRequisicao(schemaUsuario),
  existeEmailUsuario,
  cadastrarUsuario
)
rotas.post('/login', validarCorpoRequisicao(schemaLogin), logarUsuario)
rotas.get('/categoria', listarCategorias)

rotas.use(autenticarUsuario)
rotas.get('/usuario', detalharUsuario)
rotas.put('/usuario', validarCorpoRequisicao(schemaUsuario), atualizarUsuario)

rotas.post(
  '/cliente',
  validarCorpoRequisicao(schemaCliente),
  existeClienteCadastrado,
  cadastrarCliente
)
rotas.get('/cliente', listarClientes)
rotas.put(
  '/cliente/:id',
  existeCliente,
  validarCorpoRequisicao(schemaCliente),
  atualizarCliente
)
rotas.get('/cliente/:id', existeCliente, detalharCliente)

rotas.post(
  '/produto',
  multer.single('produto_imagem'),
  validarCorpoRequisicao(schemaProduto),
  existeCategoria,
  cadastrarProduto
)

rotas.put(
  '/produto/:id',
  multer.single('produto_imagem'),
  existeProduto,
  validarCorpoRequisicao(schemaProduto),
  existeCategoria,
  atualizarProduto
)

rotas.get('/produto/:id', existeProduto, detalharProduto)
rotas.delete('/produto/:id', existeProduto, existeProdutoPedido, excluirProduto)
rotas.get('/produto', existeCategoriaPelaBusca, listarProdutos)

rotas.post(
  '/pedido',
  validarCorpoRequisicao(schemaPedido),
  existeCliente,
  existeProdutoQuantidadePedido,
  cadastrarPedido
)

rotas.get('/pedido', listarPedidos)

module.exports = rotas
