const Joi = require('joi');

// Calculate the minimum date for 18 years ago
const minimumDate = new Date();
minimumDate.setFullYear(minimumDate.getFullYear() - 18);

const schema = Joi.object({
  name: Joi.string().required(),
  countryCode: Joi.string().allow(''),
  email: Joi.string().required(),
  type: Joi.string(),
  // password: Joi.string()
  //   .min(8)
  //   .pattern(new RegExp('^(?=.*[!@#$%^&*()_+\\-\\[\\]{};:"\'<>,.?/~`]).*$'))
  //   .messages({
  //     'string.pattern.base': 'Password must include at least 1 special character.',
  //   }).required(),
  password: Joi.string().allow(''),
  gender: Joi.string().required(),
  dob: Joi.date()
    .less(minimumDate) // Ensures the date is before the minimum date
    .required()
    .messages({
      'date.less': 'You must be at least 18 years old.',
      'any.required': 'Date of birth is required.',
    }),
    referralCode: Joi.string().allow(''),
    type: Joi.string(),
    emailVerified: Joi.boolean(),
    confirmAge: Joi.boolean()
});

module.exports = schema;
