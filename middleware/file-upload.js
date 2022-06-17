const multer = require("multer");
const FirebaseStorage = require("multer-firebase-storage");
const filesystemsConfig = require("../config/filesystems");

const localPublicStorage = multer.diskStorage({
  destination: `storage/app/public/`,
  filename: function (req, file, cb) {
    const filename = `${Date.now()}.${file.mimetype.split("/")[1]}`;

    cb(null, filename);
  },
});

const cloudPublicStorage = FirebaseStorage({
  bucketName: filesystemsConfig.firebase.bucketName,
  credentials: {
    projectId: filesystemsConfig.firebase.projectId,
    privateKey: filesystemsConfig.firebase.privateKey,
    clientEmail: filesystemsConfig.firebase.clientEmail,
  },
});

const fileUpload = multer({
  storage: localPublicStorage,
});

module.exports = fileUpload;
