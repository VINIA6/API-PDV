const joi = require('joi')

const schemaProduto = joi.object({
  descricao: joi.string().trim().required().messages({
    'any.required': 'O campo descrição é obrigatório',
    'string.empty': 'O campo descrição é obrigatório',
    'string.trim': 'O campo descrição não pode ser vazio',
  }),
  quantidade_estoque: joi.number().integer().min(1).required().messages({
    'any.required': 'O campo quantidade_estoque é obrigatório',
    'number.base': 'O campo quantidade_estoque precisa ser um número',
    'number.integer':
    'O campo quantidade_estoque precisa ser um número inteiro',
    'number.min': 'A quantidade_estoque deve ser maior que 0',
  }),
  valor: joi.number().integer().min(1).required().messages({
    'any.required': 'O campo valor é obrigatório',
    'number.base': 'O campo valor precisa ser um número',
    'number.integer': 'O valor precisa ser um número inteiro',
    'number.min': 'O valor deve ser maior que 0',
  }),
  categoria_id: joi.number().integer().required().messages({
    'any.required': 'O campo categoria_id é obrigatório',
    'number.integer':
    'O campo categoria_id precisa ser um número inteiro',
    'number.base': 'O campo categoria_id precisa ser um número',
  }),
})

module.exports = schemaProduto
