const express = require("express");
const authController = require("../../controllers/web/auth-controller");
const authRoutes = express.Router();

authRoutes
  .route("/register")
  .get(authController.showRegister)
  .post(authController.register);

authRoutes
  .route("/login")
  .get(authController.showLogin)
  .post(authController.login);

authRoutes.route("/logout").post(authController.logout);

module.exports = { router: authRoutes, prefix: "/" };
