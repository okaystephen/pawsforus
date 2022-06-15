const express = require("express");
const { show, index } = require("../../controllers/api/pet-controller");
const petRoutes = express.Router();

petRoutes.route('/').get(index);
petRoutes.route("/:id").get(show);

module.exports = { router: petRoutes, prefix: "/pets" };
