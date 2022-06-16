const multer = require("multer");
const fileUpload = require("../middleware/file-upload");

const petPhotoValidator = {
  addPetPhotosValidator: (req, res, next) => {
    const fieldName = "photos";
    const maxCount = 5;
    fileUpload.fields([{ name: fieldName, maxCount }])(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (!req.fileErrors) req.fileErrors = {};

        const errObj = {
          location: "files",
          msg: `You can only upload up to ${5} images`,
          param: fieldName,
        };
        req.fileErrors[fieldName] = errObj;

        return next();
      } else if (err) {
        return res.status(500).send(err);
      }

      return next();
    });
  },
};

module.exports = petPhotoValidator;
