const Joi = require('joi');

const schema = Joi.object({
  content: Joi.string().required(),
  slug: Joi.string().required(),
  shortContent: Joi.string().allow(''),
  type: Joi.string().allow(''),
  title: Joi.string().required(),
  createdBy: Joi.alternatives().try(Joi.string(), Joi.object()),
  bannerImage: Joi.string().allow(''),
  updatedBy: Joi.alternatives().try(Joi.string(), Joi.object()),
  id: Joi.alternatives().try(Joi.string(), Joi.object()),
});

module.exports = schema;