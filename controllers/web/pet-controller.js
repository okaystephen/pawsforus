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
      name,
      description,
      birthdate,
      pet_type,
      pet_type_others,
      breed,
      breed_others,
      gender,
      weight_kg,
      pet_likes,
      pet_dislikes,
      pet_allergies,
      pet_vaccines,
      status,
    } = matched;

    try {
      const pet = new Pet({
        owner_id: req.user._id,
        name,
        description,
        birthdate,
        pet_type,
        pet_type_others,
        breed,
        breed_others,
        gender,
        status,
        pet_likes,
        pet_dislikes,
        pet_allergies,
        pet_vaccines,
        weight_kg,
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
  },

  getEditPet: async (req, res) => {
    try {
      const pet = await Pet.findById(req.query.id)
        .populate("uploads")
        .lean()
        .exec();
      return res.render("edit-pet", { layout: false, inputs: pet });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  postEditPet: async (req, res) => {
    const errors = validationResult(req);
    //const fileErrors = req.fileErrors;
    const matched = matchedData(req, { locations: ["body"] });
    console.log(matched)

    if (!errors.isEmpty()) {
      //const finalErrorsObj = { ...errors.mapped(), ...fileErrors };
      const finalErrorsObj = errors.mapped()
      return res.status(400).render("edit-pet", {
        layout: false,
        errors: finalErrorsObj,
        inputs: matched,
      });
    }

    // if no errors
    const {
      name,
      description,
      birthdate,
      pet_type,
      pet_type_others,
      breed,
      breed_others,
      gender,
      weight_kg,
      pet_likes,
      pet_dislikes,
      pet_allergies,
      pet_vaccines,
      status,
    } = matched;

    try {
      const pet = {
        name: name,
        description: description,
        birthdate: birthdate,
        pet_type: pet_type,
        pet_type_others: pet_type_others,
        breed: breed,
        breed_others: breed_others,
        gender: gender,
        status: status,
        pet_likes: pet_likes,
        pet_dislikes: pet_dislikes,
        pet_allergies: pet_allergies,
        pet_vaccines: pet_vaccines,
        weight_kg: weight_kg,
        //uploads: [],
      };

     
      // create uploads model
      // const uploads = req.files.photos.map((photo) => {
      //   const u = new Upload({
      //     original_name: photo.originalname,
      //     filename: photo.filename,
      //     public_url: photo.publicUrl,
      //   });
      //   pet.uploads.push(u._id);
      //   return u;
      // });

      // const docu_uploads = req.files.docus.map((docu) => {
      //   const u = new Upload({
      //     original_name: docu.originalname,
      //     filename: docu.filename,
      //     public_url: docu.publicUrl,
      //   });
      //   pet.docus.push(u._id);
      //   return u;
      // });

      const doc = await Pet.findById(req.query.id)
      const update = { name: name,
        description: description,
        birthdate: birthdate,
        pet_type: pet_type,
        pet_type_others: pet_type_others,
        breed: breed,
        breed_others: breed_others,
        gender: gender,
        status: status,
        pet_likes: pet_likes,
        pet_dislikes: pet_dislikes,
        pet_allergies: pet_allergies,
        pet_vaccines: pet_vaccines,
        weight_kg: weight_kg };
      await doc.updateOne(update);

      // const uploadsResult = await Upload.bulkSave(uploads);
      console.log("pet profile updated");
      return res.redirect(`/profile/pet?id=${req.query.id}`);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
};

module.exports = petController;
