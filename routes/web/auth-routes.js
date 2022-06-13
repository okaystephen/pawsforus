const express = require("express");
const {
  showRegister,
  register,
  showLogin,
  login,
  logout,
} = require("../../controllers/web/auth-controller");
const { registerValidator } = require("../../validators/auth-validator");
const validate = require("../../middleware/validate");
const authRoutes = express.Router();

authRoutes
  .route("/register")
  .get(showRegister)
  .post(validate(registerValidator, true), register);

authRoutes.route("/login").get(showLogin).post(login);

authRoutes.route("/logout").post(logout);

module.exports = { router: authRoutes, prefix: "/" };
