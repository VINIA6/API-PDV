const bcrypt = require('bcrypt')

const validarSenha = async (senhaLogin, senhaUsuario) => {
  return await bcrypt.compare(senhaLogin, senhaUsuario)
}

module.exports = validarSenha
