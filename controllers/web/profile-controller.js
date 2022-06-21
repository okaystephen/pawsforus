const { getTotalPetMatches } = require("../../services/pet-service");
const Pet = require("../../models/Pet");
// const {ObjectId} = require('mongoose')

const profileController = {
  show: async (req, res) => {
    try {
      const { user } = req;
      const total_count = await getTotalPetMatches(user)
      console.log(total_count[0].count)
      const pets = await Pet.find({ owner_id: user._id, deleted: false})
        .limit(3)
        .sort({ created_at: -1 })
        .populate("uploads")
        .lean()
        .exec();

      res.render("profile", {
        layout: false,
        data: { user, pets, total_count: total_count[0].count },
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
  pet: async (req, res) => {
    try {
      const pet = await Pet.findById(req.query.id)
        .populate("uploads")
        .lean()
        .exec();
      return res.render("pet-profile", { layout: false, data: pet, user: req.user, q: req.query.id });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getAllPets: async (req, res) => {
    try {
      const { user } = req;
      const pets = await Pet.find({ owner_id: user._id, deleted: false })
        .sort({ created_at: -1 })
        .populate("uploads")
        .lean()
        .exec();

      res.render("all-pets", {
        layout: false,
        data: { pets },
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = profileController;
