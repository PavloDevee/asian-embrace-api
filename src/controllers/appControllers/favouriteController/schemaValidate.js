const Joi = require('joi');
const schema = Joi.object({
  user: Joi.alternatives().try(Joi.string(), Joi.object()).required(),
  favouriteUser: Joi.alternatives().try(Joi.string(), Joi.object()).required()
});

module.exports = schema;
