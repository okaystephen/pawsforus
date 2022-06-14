const express = require("express");
const authController = require("../../controllers/web/auth-controller");
const authRoutes = express.Router();

authRoutes
  .route("/register")
  .get(authController.showRegister)
  .post(authController.postRegister);

authRoutes
  .route("/")
  .get(authController.showLogin)
  .post(authController.postLogin);

authRoutes
  .route("/home")
  .get(authController.home)

authRoutes.route("/logout").post(authController.logout);

module.exports = { router: authRoutes, prefix: "/" };
