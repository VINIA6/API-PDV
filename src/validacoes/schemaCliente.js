const joi = require('joi')

const schemaCliente = joi.object({
  nome: joi.string().required().messages({
    'any.required': 'O campo nome é obrigatório',
    'string.empty': 'O campo nome é obrigatório',
  }),

  email: joi.string().email().required().messages({
    'string.email': 'O campo email precisa ter um formato válido',
    'any.required': 'O campo email é obrigatório',
    'string.empty': 'O campo email é obrigatório',
  }),

  cpf: joi.string().pattern(/^[0-9]+$/).length(11).required().messages({
    'string.empty': 'O campo cpf é obrigatório',
    'any.required': 'O campo cpf é obrigatório',
    'string.pattern.base': 'O campo cpf deve conter apenas números, sem espaços ou caracteres especiais',
    'string.length': 'O CPF precisa conter exatamente 11 caracteres'
  }),
  
  cep: joi.string().pattern(/^[0-9]+$/).length(8).allow('').messages({
    'string.pattern.base': 'O campo cep deve conter apenas números, sem espaços ou caracteres especiais',
    'string.length': 'O CEP precisa conter exatamente 8 caracteres'
  }),
  rua: joi.string().allow('').messages({
    'string.empty': 'O campo rua é opcional'
  }),
  
  numero: joi.string().pattern(/^[0-9]+$/).allow('').messages({
    'string.pattern.base': 'O campo número deve conter apenas números, sem espaços ou caracteres especiais',
    'string.empty': 'O campo número é opcional'
  }),
  
  bairro: joi.string().allow('').messages({
    'string.empty': 'O campo bairro é opcional'
  }),
  
  cidade: joi.string().allow('').messages({
    'string.empty': 'O campo cidade é opcional'
  }),
  
  estado: joi.string().length(2).allow('').messages({
    'string.length': 'O estado precisa conter exatamente 2 caracteres',
    'string.empty': 'O campo estado é opcional'
  })
  
  
})
module.exports = schemaCliente
