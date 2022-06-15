const express = require("express");
const {
  showRegister,
  showLogin,
  logout,
  postRegister,
  postLogin,
  home,
  match,
  select,
  addpet,
  chat,
  chatbox,
} = require("../../controllers/web/auth-controller");
const {
  registerValidator,
  loginValidator,
} = require("../../validators/auth-validator");
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
  .post(ensureLoggedOut, loginValidator, postLogin);


authRoutes.route("/add-pet").get(addpet);

// set index as login page
authRoutes.route("/").get((req, res) => res.redirect("/login"));
authRoutes.route("/match").get(match);
authRoutes.route("/home").get(home);
authRoutes.route("/select").get(select);
authRoutes.route("/chat").get(chat);
authRoutes.route("/chatbox").get(chatbox);
authRoutes
  .route("/whoami")
  .get(ensureLoggedIn, (req, res) => res.send(req.user));
authRoutes.route("/logout").get(logout);
authRoutes.route("/logout").post(ensureLoggedIn, logout);

module.exports = { router: authRoutes, prefix: "/" };
