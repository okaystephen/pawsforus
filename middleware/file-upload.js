const multer = require("multer");

const publicStorage = multer.diskStorage({
  destination: `storage/app/public/`,
  filename: function (req, file, cb) {
    const filename = `${Date.now()}.${file.mimetype.split("/")[1]}`;

    cb(null, filename);
  },
});

const fileUpload = multer({
  storage: publicStorage,
  fileFilter: (req, file, cb) => {
    // reject executable files from being uploaded
    if (file.mimetype.split("/")[0] === "application") {
      return cb(null, false);
    }

    return cb(null, true);
  },
});

module.exports = fileUpload;
