const express = require("express");
const {
  showAddPet,
  postAddPet,
  deletePet
} = require("../../controllers/web/pet-controller");
const { addPetValidator } = require("../../validators/pet-validator");
const ensureLoggedIn = require("../../middleware/ensure-logged-in");
const {
  addPetPhotosValidator,
} = require("../../validators/pet-photo-validator");
const petRoutes = express.Router();

petRoutes
  .route("/add-pet")
  .get(ensureLoggedIn, showAddPet)
  .post(ensureLoggedIn, addPetPhotosValidator, addPetValidator, postAddPet);

petRoutes
  .route("/delete-pet")
  .post(ensureLoggedIn, deletePet);

module.exports = { router: petRoutes, prefix: "/" };
