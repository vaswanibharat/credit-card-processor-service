const Joi = require('joi');

const getCreditCardSchemas = Joi.object().keys({
  headers: Joi.object()
    .keys({
      correlationid: Joi.string().required(),
    })
    .required()
    .unknown(true),
}).required();

module.exports = getCreditCardSchemas;
