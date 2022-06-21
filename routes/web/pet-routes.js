const express = require("express");
const {
  showAddPet,
  postAddPet,
  deletePet,
  getEditPet,
  postEditPet,
  getAllPets
} = require("../../controllers/web/pet-controller");
const { addPetValidator, editPetValidator } = require("../../validators/pet-validator");
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

petRoutes
  .route("/edit-pet")
  .get(ensureLoggedIn, getEditPet)
  .post(ensureLoggedIn, editPetValidator, postEditPet);

petRoutes
  .route("/all-pets")
  .get(ensureLoggedIn, getAllPets)

module.exports = { router: petRoutes, prefix: "/" };
