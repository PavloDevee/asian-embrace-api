const Joi = require('joi');
const schema = Joi.object({
  actionBy: Joi.alternatives().try(Joi.string(), Joi.object()).required(),
  actionOn: Joi.alternatives().try(Joi.string(), Joi.object()).required(),
  message: Joi.string().required(),
});

module.exports = schema;
