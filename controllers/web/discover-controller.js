const Pet = require("../../models/Pet");

const discoverController = {
  index: async (req, res) => {
    try {
      const pets = await Pet.find().populate("uploads").lean().exec();

      return res.render("discover", {
        layout: false,
        data: { first: pets.shift(), rest: pets },
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = discoverController;
