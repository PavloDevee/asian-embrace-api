const Joi = require("joi");

// Calculate the minimum date for 18 years ago
const minimumDate = new Date();
minimumDate.setFullYear(minimumDate.getFullYear() - 18);

const schema = Joi.object({
  name: Joi.string().required(),
  country: Joi.string().required(),
  state: Joi.string().allow("").optional(),
  city: Joi.string().required(),
  headLine: Joi.string().required(),
  dob: Joi.date()
    .less(minimumDate) // Ensures the date is before the minimum date
    .required()
    .messages({
      "date.less": "You must be at least 18 years old.",
      "any.required": "Date of birth is required.",
    }),
});

module.exports = schema;
