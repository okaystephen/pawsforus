const appConfig = require("./app");

// TODO: create a url generator in helpers/url.js. This should generate a link given a file name (i.e., base url + file name)
module.exports = {
  default: process.env.FILESYSTEM_DRIVER || "local",
  cloud: process.env.FILESYSTEM_CLOUD || "firebase",
  firebase: {
    bucketName: process.env.FIREBASE_BUCKET_NAME,
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  },
};
