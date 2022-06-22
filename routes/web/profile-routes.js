const express = require("express");
const {
  show,
  pet,
  getAllPets,
} = require("../../controllers/web/profile-controller");
const ensureLoggedIn = require("../../middleware/ensure-logged-in");
const profileRoutes = express.Router();

profileRoutes.use(ensureLoggedIn);

profileRoutes.route("/").get(show);

profileRoutes.route("/pet").get(pet);

profileRoutes.route("/all-pets").get(getAllPets);

module.exports = { router: profileRoutes, prefix: "/profile" };
