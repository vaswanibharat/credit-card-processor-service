const Joi = require('joi');

const addCreditCardSchemas = Joi.object().keys({
  headers: Joi.object()
    .keys({
      correlationid: Joi.string().required(),
    })
    .required()
    .unknown(true),
  inputBody: Joi.object().keys({
    requestDetails: Joi.object({
      name: Joi.string().required(),
      cardNumber: Joi.string().regex(/^[0-9]/).required(),
      limit: Joi.number().positive().required(),
    }).required(),
  }).required(),
}).required();

module.exports = addCreditCardSchemas;
