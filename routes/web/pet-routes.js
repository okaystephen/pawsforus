const express = require("express");
const {
  showAddPet
} = require("../../controllers/web/pet-controller");
const petRoutes = express.Router();

petRoutes.route("/add-pet").get(showAddPet);


module.exports = { router: petRoutes, prefix: "/" };
