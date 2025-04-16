const Joi = require('joi');
const schema = Joi.object({
  sentBy: Joi.alternatives().try(Joi.string(), Joi.object()).required(),
  receivedBy: Joi.alternatives().try(Joi.string(), Joi.object()).required()
});

module.exports = schema;
