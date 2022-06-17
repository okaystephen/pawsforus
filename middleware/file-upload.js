const multer = require("multer");
const FirebaseStorage = require("multer-firebase-storage");
const filesystemsConfig = require("../config/filesystems");
const appConfig = require("../config/app");

const localPublicStorage = multer.diskStorage({
  destination: `storage/app/public/`,
  filename: function (req, file, cb) {
    const filename = `${Date.now()}.${file.mimetype.split("/")[1]}`;
    
    file.publicUrl = new URL(
      `storage/${filename}`,
      `${appConfig.url}:${appConfig.port}`
    ).toString();

    cb(null, filename);
  },
});

// const cloudPublicStorage = FirebaseStorage({
//   bucketName: filesystemsConfig.firebase.bucketName,
//   credentials: {
//     projectId: filesystemsConfig.firebase.projectId,
//     privateKey: filesystemsConfig.firebase.privateKey,
//     clientEmail: filesystemsConfig.firebase.clientEmail,
//   },
//   directoryPath: "public",
//   public: true,
//   unique: true,
// });

const fileUpload = multer({
  storage: localPublicStorage,
  preservePath: true,
});

module.exports = fileUpload;
