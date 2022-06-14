const { body, oneOf } = require("express-validator");

const matchesPassword = (value, { req }) => {
  if (value !== req.body.password) {
    throw new Error("Password confirmation does not match password");
  }

  return true;
};

const authValidator = {
  registerValidator: [
    body("email")
      .exists()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is not a valid email"),
    body("full_name", "Full name is required").exists().notEmpty(),
    body("password")
      .exists()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
    body("password_confirmation", "Password confirmation must match password")
      .exists()
      .custom(matchesPassword),
    body("agree_tnc", "You must agree to the Terms & Conditions")
      .exists()
      .isBoolean({ loose: true }),
  ],
  loginValidator: [
    body("email", "Incorrect email or password").exists().isEmail(),
    body("password", "Incorrect email or password")
      .exists()
      .isLength({ min: 8 }),
      body('remember_me').optional()
  ],
};

module.exports = authValidator;
