const { sendResponse } = require('@/helpers');
const schema = require('./schemaValidate');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Creates a new document in the specified model and a corresponding Stripe product and plan.
 * @param {Object} Model - Mongoose model to save the document.
 * @returns {Function} Express route handler function.
 */
const create = async (Model, req, res) => {
  // Assign the logged-in user as the creator
  req.body.createdBy = req.user._id;

  // Validate request body using predefined schema
  const { error, value } = schema.validate(req.body);
  if (error) {
    return sendResponse(res, 400, false, null, error.details[0]?.message);
  }

  const { name, price, description } = value;

  // Create a product in Stripe
  const product = await stripe.products.create({
    name,
    description,
  });

  // Convert price to cents (Stripe requires smallest currency unit)
  const amountInCents = Math.round(price * 100);

  // Define Stripe price plan data
  const planDataStripe = {
    product: product.id,
    nickname: `${name} Subscription`,
    currency: 'usd',
    recurring: { interval: 'month' },
    unit_amount: amountInCents, // Amount in cents
  };

  // Create a price plan in Stripe
  const priceCreate = await stripe.prices.create(planDataStripe);

  // Construct the final data object with Stripe details
  const data = {
    ...value,
    stripePlanId: priceCreate.id,
    stripeProductId: product.id,
  };

  // Save the document in the database
  const result = await new Model(data).save();

  // Return success response
  return sendResponse(res, 200, true, result, 'Document created successfully.');
};

module.exports = create;
