const multer = require("multer");

const localStorage = multer.diskStorage({
  destination: `storage/app/public/`,
  filename: function (req, file, cb) {
    const filename = `${Date.now()}.${file.mimetype.split("/")[1]}`;

    cb(null, filename);
  },
});

const fileUpload = multer({ storage: localStorage });

module.exports = fileUpload;
