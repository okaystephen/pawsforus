const express = require("express");
const { show, index } = require("../../controllers/web/match-controller");
const matchRoutes = express.Router();

matchRoutes.route("/").get(index);
matchRoutes.route("/:id").get(show);

module.exports = { router: matchRoutes, prefix: "/match" };
