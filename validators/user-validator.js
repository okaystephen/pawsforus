const { body, param } = require("express-validator");

const userValidator = {
  editUserValidator: [
    param("id", "ID is invalid").exists().isMongoId(),
    body("full_name", "Full name is required").exists().notEmpty(),
  ],
};

module.exports = userValidator;
