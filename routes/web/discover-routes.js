const express = require("express");
const { index } = require("../../controllers/web/discover-controller");
const ensureLoggedIn = require("../../middleware/ensure-logged-in");
const discoverRoutes = express.Router();

discoverRoutes.route("/").get(ensureLoggedIn, index);

module.exports = { router: discoverRoutes, prefix: "/discover" };
