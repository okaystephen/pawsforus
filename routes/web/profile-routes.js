const express = require("express");
const { show } = require("../../controllers/web/profile-controller");
const ensureLoggedIn = require("../../middleware/ensure-logged-in");
const profileRoutes = express.Router();

profileRoutes.use(ensureLoggedIn);

profileRoutes.route("/").get(show);

// TODO: edit profile
profileRoutes.route("/edit").get((req, res) => res.json(req.user));

module.exports = { router: profileRoutes, prefix: "/profile" };
