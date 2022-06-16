const express = require("express");
const {
  showAddPet,
  postAddPet
} = require("../../controllers/web/pet-controller");
const {
  addPetValidator
} = require("../../validators/pet-validator");
const ensureLoggedIn = require("../../middleware/ensure-logged-in");
const petRoutes = express.Router();

petRoutes
    .route("/add-pet")
    .get(ensureLoggedIn, showAddPet)
    .post(ensureLoggedIn, addPetValidator, postAddPet)

module.exports = { router: petRoutes, prefix: "/" };
