const s3 = require('../config/s3Config')
const publicarImagem = async (path, buffer, mimetype) => {
  const imagem_produto = await s3
    .upload({
      Bucket: process.env.BB_KEY_NAME,
      Key: path,
      Body: buffer,
      ContentType: mimetype,
    })
    .promise()

  return {
    path: imagem_produto.Key,
    url: `https://${process.env.BB_KEY_NAME}.${process.env.BB_ENDPOINT}/${imagem_produto.Key}`,
  }
}

module.exports = publicarImagem
