const express = require("express");
const { show, index } = require("../../controllers/web/match-controller");
const ensureLoggedIn = require("../../middleware/ensure-logged-in");
const ensureUserHasAPet = require("../../middleware/ensure-user-has-a-pet");
const matchRoutes = express.Router();

matchRoutes.use(ensureLoggedIn, ensureUserHasAPet);
matchRoutes.route("/").get(index);
matchRoutes.route("/:id").get(show);

module.exports = { router: matchRoutes, prefix: "/match" };
