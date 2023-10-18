const fs = require('fs/promises')
const transportador = require('../config/nodemailerConfig')

const enviarEmail = async (nomeCliente, emailCliente) => {
  const arquivo = await fs.readFile('./src/templates/confirmacaoPedido.html')

  transportador.sendMail({
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
    to: `${nomeCliente} <${emailCliente}>`,
    subject: 'Confirmação de Pedido',

    html: arquivo.toString(),
  })
}

module.exports = enviarEmail
