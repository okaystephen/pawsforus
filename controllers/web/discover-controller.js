const { getPetsForMatching } = require("../../services/pet-service");

const discoverController = {
  index: async (req, res) => {
    try {
      const pets = await getPetsForMatching(req.user);
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
