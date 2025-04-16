const Joi = require('joi');

const schema = Joi.object({
  content: Joi.string().required(),
  page: Joi.string().required(),
  title: Joi.string().required(),
  shortContent: Joi.string().allow(''),
  createdBy: Joi.alternatives().try(Joi.string(), Joi.object()),
  bannerImage: Joi.string().allow('')
});

module.exports = schema;