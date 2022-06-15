const express = require("express");
const { update } = require("../../controllers/api/user-controller");
const { editUserValidator } = require("../../validators/user-validator");
const ensureLoggedIn = require("../../middleware/ensure-logged-in");

const userRoutes = express.Router();

const ensureAuthorized = (req, res, next) => {
  if (req.user._id.toString() === req.params.id) return next();

  return res.status(403).json({ error: { message: "Forbidden" } });
};

userRoutes
  .route("/:id")
  .all(ensureLoggedIn, ensureAuthorized)
  .put(editUserValidator, update);

module.exports = { router: userRoutes, prefix: "/users" };
