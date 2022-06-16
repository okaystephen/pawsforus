const { body, oneOf } = require("express-validator");

const petValidator = {
  addPetValidator: [
    body("pet_name")
        .trim()
        .notEmpty()
        .withMessage('Pet name is required.')
        .escape(),
    body("pet_about")
        .trim()
        .notEmpty()
        .withMessage('Pet description is required.')
        .escape(),
    body("pet_birth")
        .notEmpty()
        .withMessage('Pet birth is required.')
        .custom((value, { req, location, path }) => {
            var [year, month, day] = value.split('-');
            var input = Date.UTC(
                Number(year),
                Number(month) - 1, 
                Number(day),
            );
            var now = Date.now();

            return (
                (input < now) 
            );
        })
        .withMessage('Please enter a valid date.'),
    body("pet_type")
        .notEmpty()
        .withMessage('Pet type is required.')
        .escape(),
    body("pet_type_others")
        .if(
            (value, { req }) =>
            req.body.pet_type === 'Others',
        )
        .trim()
        .notEmpty()
        .withMessage('Please fill this out.')
        .escape(),
    body("pet_breed")
        .if(
            (value, { req }) =>
            req.body.pet_type !== 'Others',
        )
        .notEmpty()
        .withMessage('Pet breed is required.')
        .escape(),
    body("pet_breed_others")
        .if(
            (value, { req }) =>
            req.body.pet_type === 'Others',
        )
        .trim()
        .notEmpty()
        .withMessage('Please fill this out.')
        .escape(),
    body("pet_gender")
        .notEmpty()
        .withMessage('Pet gender is required.')
        .escape(),
    body("pet_weight")
        .notEmpty()
        .withMessage('Pet weight is required.')
        .escape(),
    body("pet_status")
        .notEmpty()
        .withMessage('Pet status is required.')
        .escape(),
    // body('pet_images')
    //     .custom((value, { req }) => {
    //         if (!req.file) throw new Error("Please upload atleast one image of your pet.");
    //         return true;
    //     })
    //     .custom((value, {req}) => {
    //             if((req.files.mimetype === 'image/jpeg') || (req.files.mimetype === 'image/png')){
    //                 return 'valid'; // return "non-falsy" value to indicate valid data"
    //             }else{
    //                 return false; // return "falsy" value to indicate invalid data
    //             }
    //         })
    //     .withMessage('Please only submit jpeg or png format for images.'), 
  ],
};

module.exports = petValidator;
