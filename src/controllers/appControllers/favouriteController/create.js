const { sendResponse } = require("@/helpers");
const schema = require("./schemaValidate");


const create = async (Model, req, res) => {
  // Attach the admin ID to the request body
  req.body.user = req.user._id;

  // Validate the request body against the schema
  const { error, value } = schema.validate(req.body);
  if (error) {
    return sendResponse(
      res,
      400,
      false,
      null,
      error.details[0]?.message || "Validation error"
    );
  }

  const { user, favouriteUser } = value;

  // Check if the favourite already exists and is not removed
  const existingFavourite = await Model.findOne({
    user,
    favouriteUser,
    removed: false,
  });

  if (existingFavourite) {
    // Mark the existing favourite as removed
    await Model.findByIdAndUpdate(
      existingFavourite._id,
      { removed: true },
      { new: true, runValidators: true }
    );
    return sendResponse(res, 200, true, null, "Unfavourited");
  }

  // Create a new favourite
  await new Model(value).save();

  // Add Notification for favourite
  const { notification } = require("@/helpers");
  await notification("favourite", user, favouriteUser);

  return sendResponse(res, 200, true, null, "Favourited");
};

module.exports = create;
