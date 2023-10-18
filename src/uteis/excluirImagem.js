const s3 = require('../config/s3Config')
const excluirImagem = async (path) => {
  await s3
    .deleteObject({
      Bucket: process.env.BB_KEY_NAME,
      Key: path,
    })
    .promise()
}

module.exports = excluirImagem
