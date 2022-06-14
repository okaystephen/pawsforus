const express = require("express");
const authController = require("../../controllers/web/auth-controller");
const authRoutes = express.Router();

// Validators
const user_authValidator = require('../../validators/user_authValidator.js');

authRoutes
  .route("/register")
  .get(authController.showRegister)
  .post(user_authValidator.registerValidation(), authController.postRegister);

authRoutes
  .route("/")
  .get(authController.showLogin)
  .post(authController.postLogin);

authRoutes
  .route("/home")
  .get(authController.home);

authRoutes
  .route("/match")
  .get(authController.match);

authRoutes.route("/logout").post(authController.logout);

module.exports = { router: authRoutes, prefix: "/" };
