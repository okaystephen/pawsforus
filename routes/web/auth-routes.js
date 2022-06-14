const express = require("express");
const {
  showRegister,
  showLogin,
  logout,
  postRegister,
  postLogin,
  home,
  match,
} = require("../../controllers/web/auth-controller");
const {
  registerValidator,
  loginValidator,
} = require("../../validators/auth-validator");
const validate = require("../../middleware/validate");
const authService = require("../../services/auth-service");
const ensureLoggedOut = require("../../middleware/ensure-logged-out");
const ensureLoggedIn = require("../../middleware/ensure-logged-in");
const authRoutes = express.Router();


authRoutes
  .route("/register")
  .get(ensureLoggedOut, showRegister)
  .post(ensureLoggedOut, registerValidator, postRegister);

authRoutes
  .route("/login")
  .get(ensureLoggedOut, showLogin)
  .post(
    ensureLoggedOut,
    validate(loginValidator, true),
    authService.authenticate("local", {
      failureRedirect: "/login",
      failureMessage: true,
    }),
    postLogin
  );

// set index as login page
authRoutes.route("/").get((req, res) => res.redirect("/login"));
authRoutes
  .route("/match")
  .get(match);

authRoutes.route("/home").get(home);

authRoutes.route("/logout").post(ensureLoggedIn, logout);

module.exports = { router: authRoutes, prefix: "/" };
