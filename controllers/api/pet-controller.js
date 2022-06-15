const Pet = require("../../models/Pet");

const petController = {
  index: async (req, res) => {
    try {
      const pets = await Pet.find();

      return res.json({ data: pets });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  show: async (req, res) => {
    try {
      const pet = await Pet.findById(req.params.id);

      if (!pet) return res.status(404).json({ message: "Not found" });

      return res.json({ data: pet });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = petController;
