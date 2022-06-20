const express = require("express");
const { update, index, show } = require("../../controllers/api/user-controller");
const { editUserValidator } = require("../../validators/user-validator");
const ensureLoggedIn = require("../../middleware/ensure-logged-in");
const Pet = require("../../models/Pet");

const userRoutes = express.Router();

const ensureAuthorized = (req, res, next) => {
  if (req.user._id.toString() === req.params.id) return next();

  return res.status(403).json({ error: { message: "Forbidden" } });
};

userRoutes.route("/").get(ensureLoggedIn, index);

userRoutes
  .route("/:id")
  .all(ensureLoggedIn, ensureAuthorized)
  .get(show)
  .put(editUserValidator, update);

userRoutes.route("/:id/pets").get(ensureLoggedIn, async (req, res) => {
  try {
    const pets = await Pet.where("owner_id").equals(req.user._id).lean().exec();
    return res.json({ data: pets });
  } catch (error) {
    return res.status(500).send(error);
  }
});
module.exports = { router: userRoutes, prefix: "/users" };
