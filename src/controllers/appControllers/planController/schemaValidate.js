const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  createdBy: Joi.alternatives().try(Joi.string(), Joi.object()),
  enabled: Joi.boolean().required()
});

module.exports = schema;