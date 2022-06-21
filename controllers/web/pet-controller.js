const Pet = require("../../models/Pet");
const { validationResult, matchedData } = require("express-validator");
const Upload = require("../../models/Upload");

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
      pet_likes,
      pet_dislikes,
      pet_allergies,
      pet_vaccines,
      pet_status,
    } = matched;

    try {
      const pet = new Pet({
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
        pet_likes,
        pet_dislikes,
        pet_allergies,
        pet_vaccines,
        weight_kg: pet_weight,
        uploads: [],
      });

      // create uploads model
      const uploads = req.files.photos.map((photo) => {
        const u = new Upload({
          original_name: photo.originalname,
          filename: photo.filename,
          public_url: photo.publicUrl,
        });
        pet.uploads.push(u._id);
        return u;
      });

      // const docu_uploads = req.files.docus.map((docu) => {
      //   const u = new Upload({
      //     original_name: docu.originalname,
      //     filename: docu.filename,
      //     public_url: docu.publicUrl,
      //   });
      //   pet.docus.push(u._id);
      //   return u;
      // });

      await pet.save();
      const uploadsResult = await Upload.bulkSave(uploads);
      console.log("pet profile added", uploadsResult);
      return res.redirect("/discover");
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },

  deletePet: function(req, res){
    var pet_id = req.body.pet_id
    Pet.deleteById(pet_id, function (err, petDocument) {
        if(petDocument){
          res.send("success")
        }
    });
  }
};

module.exports = petController;
