const Pet = require("../../models/Pet");
const { validationResult, matchedData } = require("express-validator");
const Upload = require("../../models/Upload");
const PetUpload = require("../../models/PetUpload");

const petController = {
  showAddPet: (req, res) => {
    res.render("add-pet", {
      layout: false,
    });
  },

  postAddPet: async (req, res) => {
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
      const pet = await Pet.create({
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
      });

      // create upload model, then create petupload model
      const uploads = req.files.photos.map(
        (photo) =>
          new Upload({
            original_name: photo.originalname,
            filename: photo.filename,
            public_url: photo.publicUrl,
          })
      );
      const petUploads = uploads.map(
        (upload) => new PetUpload({ pet_id: pet._id, upload_id: upload._id })
      );

      const result1 = await Upload.bulkSave(uploads);
      const result2 = await PetUpload.bulkSave(petUploads);

      console.log("pet profile added", result1, result2);
      return res.redirect("/discover");
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
};

module.exports = petController;
