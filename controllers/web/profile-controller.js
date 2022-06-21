const Pet = require("../../models/Pet");
// const {ObjectId} = require('mongoose')

const profileController = {
  show: async (req, res) => {
    try {
      const { user } = req;
      const pets = await Pet.find({ owner_id: user._id, deleted: false })
        .limit(3)
        .sort({ created_at: -1 })
        .populate("uploads")
        .lean()
        .exec();

      res.render("profile", {
        layout: false,
        data: { user, pets },
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = profileController;
