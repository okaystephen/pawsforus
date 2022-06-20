const express = require("express");
const matchController = require("../../controllers/api/match-controller");
const ensureLoggedIn = require("../../middleware/ensure-logged-in");
const { createMatchValidator } = require("../../validators/match-validator");
const matchRoutes = express.Router();

matchRoutes
  .route("/")
  .post(ensureLoggedIn, createMatchValidator, matchController.store);

module.exports = { router: matchRoutes, prefix: "/matches" };
