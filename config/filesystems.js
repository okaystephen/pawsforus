const appConfig = require("./app");

module.exports = {
  firebase: {
    bucketName: process.env.FIREBASE_BUCKET_NAME,
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  },
};
