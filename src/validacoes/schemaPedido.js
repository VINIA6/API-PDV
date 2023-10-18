const joi = require('joi')

const schemaPedido = joi.object({
  cliente_id: joi.number().integer().required().messages({
    'any.required': 'O campo cliente_id é obrigatório',
    'number.base': 'O campo cliente_id precisa ser um número',
    'number.integer': 'O valor precisa ser um número inteiro',
    'string.empty': 'O campo cliente_id é obrigatório',
  }),
  observacao: joi.string().allow(''),
  pedido_produtos: joi
    .array()
    .required()
    .messages({
      'any.required': 'O campo pedidos_produtos é obrigatório',
    })
    .items({
      produto_id: joi.number().integer().required().messages({
        'any.required': 'O campo produto_id é obrigatório',
        'number.integer': 'O produto_id precisa ser um número inteiro',
        'number.base': 'O campo produto_id precisa ser um número',
      }),
      quantidade_produto: joi.number().integer().required().messages({
        'any.required': 'O campo quantidade_produto é obrigatório',
        'number.integer': 'O quantidade_produto precisa ser um número inteiro',
        'number.base': 'O campo quantidade_produto precisa ser um número',
      }),
    }),
})
module.exports = schemaPedido
