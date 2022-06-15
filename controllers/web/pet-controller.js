const Pet = require("../../models/Pet");

const petController = {
  showAddPet: (req, res) => {
    res.render("add-pet", {
      layout: false,
    });
  },
};

module.exports = petController;
