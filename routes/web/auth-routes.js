const express = require("express");
const {
  showRegister,
  showLogin,
  logout,
  postRegister,
  postLogin,
  home,
} = require("../../controllers/web/auth-controller");
const { registerValidator } = require("../../validators/auth-validator");
const validate = require("../../middleware/validate");
const authService = require("../../services/auth-service");
const authRoutes = express.Router();

authRoutes
  .route("/register")
  .get(showRegister)
  .post(validate(registerValidator, true), postRegister);

authRoutes
  .route("/login")
  .get(showLogin)
  .post(
    authService.authenticate("local", {
      failureRedirect: "/login",
      failureMessage: true,
    }),
    postLogin
  );

authRoutes.route("/").get(showLogin).post(postLogin);

authRoutes.route("/home").get(home);

authRoutes.route("/logout").post(logout);

module.exports = { router: authRoutes, prefix: "/" };
