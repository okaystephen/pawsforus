const Pet = require("../../models/Pet");
const { validationResult, matchedData } = require("express-validator");
var multer = require("multer");
var uploadMiddleware = require("../../middleware/upload-images");

const petController = {
  showAddPet: (req, res) => {
    res.render("add-pet", {
      layout: false,
    });
  },

  postAddPet: (req, res) => {
    const errors = validationResult(req);
    const fileErrors = req.fileErrors;
    const matched = matchedData(req, { locations: ["body"] });

    if (!errors.isEmpty() || fileErrors) {
      const finalErrorsObj = { ...errors.mapped(), ...fileErrors };
      return res.status(400).render("add-pet", {
        layout: false,
        errors: finalErrorsObj,
        inputs: matched,
      });
    }

    // if no errors
    const {
      pet_name,
      pet_about,
      pet_birth,
      pet_type,
      pet_type_others,
      pet_breed,
      pet_breed_others,
      pet_gender,
      pet_weight,
      pet_status,
    } = matched;

    try {
      Pet.create(
        {
          owner_id: req.user._id,
          name: pet_name,
          description: pet_about,
          birthdate: pet_birth,
          pet_type,
          pet_type_others,
          breed: pet_breed,
          breed_others: pet_breed_others,
          gender: pet_gender,
          status: pet_status,
          weight_kg: pet_weight,
        },
        function (err, small) {
          if (err) return handleError(err);
          console.log("pet profile added");
          res.redirect("/discover"); // or redirect to specific pet profile
        }
      );
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = petController;
