const Pet = require("../../models/Pet");

const matchController = {
  index: async (req, res) => {
    try {
      // first pet as default
      const tempPet = await Pet.findOne()
        .where("owner_id")
        .ne(req.user._id)
        .populate("uploads")
        .lean()
        .exec();
      return res.render("match", { layout: false, data: tempPet });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  show: async (req, res) => {
    try {
      const pet = await Pet.findById(req.params.id)
        .populate("uploads")
        .lean()
        .exec();
      return res.render("match", { layout: false, data: pet });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = matchController;
