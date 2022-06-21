const { body, check } = require("express-validator");

const petValidator = {
  addPetValidator: [
    body("pet_name")
      .trim()
      .notEmpty()
      .withMessage("Pet name is required.")
      .escape(),
    body("pet_about")
      .trim()
      .notEmpty()
      .withMessage("Pet description is required.")
      .escape(),
    body("pet_birth")
      .notEmpty()
      .withMessage("Pet birth is required.")
      .custom((value, { req, location, path }) => {
        var [year, month, day] = value.split("-");
        var input = Date.UTC(Number(year), Number(month) - 1, Number(day));
        var now = Date.now();

        return input < now;
      })
      .withMessage("Please enter a valid date."),
    body("pet_type").notEmpty().withMessage("Pet type is required.").escape(),
    body("pet_type_others")
      .if((value, { req }) => req.body.pet_type === "Others")
      .trim()
      .notEmpty()
      .withMessage("Please fill this out.")
      .escape(),
    body("pet_breed")
      .if((value, { req }) => req.body.pet_type !== "Others")
      .notEmpty()
      .withMessage("Pet breed is required.")
      .escape(),
    body("pet_breed_others")
      .if((value, { req }) => req.body.pet_type === "Others")
      .trim()
      .notEmpty()
      .withMessage("Please fill this out.")
      .escape(),
    body("pet_gender")
      .notEmpty()
      .withMessage("Pet gender is required.")
      .escape(),
    body("pet_weight")
      .notEmpty()
      .withMessage("Pet weight is required.")
      .escape(),
    body("pet_likes")
      .trim()
      .notEmpty()
      .withMessage("Pet likes is required.")
      .escape(),
    body("pet_dislikes")
      .trim()
      .notEmpty()
      .withMessage("Pet dislikes is required.")
      .escape(),
    body("pet_allergies")
      .trim()
      .notEmpty()
      .withMessage("Pet allergies is required.")
      .escape(),
    body("pet_vaccines")
      .trim()
      .notEmpty()
      .withMessage("Pet vaccines is required.")
      .escape(),
    // check("docus")
    //   .custom((value, { req }) => {
    //     if (!req.files.docus)
    //       throw new Error("Please upload atleast one document of your pet.");
    //     return true;
    //   })
    //   .custom((value, { req }) => {
    //     const allowed = ["application/pdf"];

    //     const isValidMimeType = (el) => {
    //       const val = allowed.includes(el.mimetype);

    //       return val;
    //     };

    //     if (!req.files.docus.every(isValidMimeType))
    //       throw new Error("Please only submit .pdf documents.");
    //     return true;
    //   }),
    body("pet_status")
      .notEmpty()
      .withMessage("Pet status is required.")
      .escape(),
    check("photos")
      .custom((value, { req }) => {
        if (!req.files.photos)
          throw new Error("Please upload atleast one image of your pet.");
        return true;
      })
      .custom((value, { req }) => {
        const allowed = ["image/jpeg", "image/png"];

        const isValidMimeType = (el) => {
          const val = allowed.includes(el.mimetype);

          return val;
        };

        if (!req.files.photos.every(isValidMimeType))
          throw new Error("Please only submit jpeg or png format for images.");
        return true;
      }),
  ],
};

module.exports = petValidator;
