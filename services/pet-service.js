const Pet = require("../models/Pet");
const User = require("../models/User");

const petService = {
  /**
   * Returns all pets that can be matched with the user's pets.
   *
   * @param {User} user the user who is looking for a match for their pet
   */
  getPetsForMatching: async (user) => {
    try {
      const pets = await Pet.find()
        .where("owner_id")
        .ne(user._id)
        .where("status")
        .equals(Pet.getStatuses().FOR_MATCHING)
        .populate("uploads")
        .lean()
        .exec();

      return pets;
    } catch (error) {
      throw error;
    }
  },
  getOneOwnedByUser: async ({ user_id }) => {
    const pet = await Pet.findOne({ owner_id: user_id })
      .populate("uploads")
      .lean()
      .exec();

    return pet;
  },
  getOneById: async (id) => {
    const pet = await Pet.findById(id).populate("uploads").lean().exec();

    return pet;
  },
};

module.exports = petService;
