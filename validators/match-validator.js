const { body } = require("express-validator");
const Match = require("../models/Match");

const hasNotYetLikedThisPet = async (value, { req, location, path }) => {
  if (!req.body.pet_id || !req.body.liked_pet_id) {
    throw new Error("Missing inputs.");
  }

  const match = await Match.findOne({
    pet_id: req.body.pet_id,
    liked_pet_id: req.body.liked_pet_id,
  })
    .lean()
    .exec();

  if (match) throw new Error("Your pet has already liked this pet.");

  return true;
};

const matchValidator = {
  createMatchValidator: [
    body("pet_id", "Pet ID is required.").exists().isMongoId(),
    body("liked_pet_id", "Liked Pet ID is required.")
      .exists()
      .isMongoId()
      .custom(hasNotYetLikedThisPet),
  ],
};

module.exports = matchValidator;
