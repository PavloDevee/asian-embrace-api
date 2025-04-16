const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(), // Ensures a valid email format
  message: Joi.string().allow(''),
});

module.exports = schema;
