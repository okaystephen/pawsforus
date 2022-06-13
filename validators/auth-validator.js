const { body, check } = require("express-validator");

const matchesPassword = (value, { req }) => {
  if (value !== req.body.password) {
    throw new Error("Password confirmation does not match password");
  }
};

const authValidator = {
  registerValidator: [
    check("email")
      .exists()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Not a valid email"),
    body("full_name", "Full name is required").exists(),
    body("password")
      .exists()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
    body("password_confirmation").exists().custom(matchesPassword),
    body("agree_tnc")
      .exists()
      .withMessage("You must agree to the Terms & Conditions")
      .isInt({ min: 0, max: 1 })
      .withMessage("Must be 0 or 1 (boolean)"),
  ],
};

module.exports = authValidator;
