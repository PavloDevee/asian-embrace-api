const Joi = require('joi');

const schema = Joi.object({
  id: Joi.alternatives().try(Joi.string(), Joi.object()),
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  updatedBy: Joi.alternatives().try(Joi.string(), Joi.object()),
  enabled: Joi.boolean().required()
});

module.exports = schema;