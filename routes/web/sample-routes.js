const express = require("express");
const sampleController = require("../../controllers/web/sample-controller");
const sampleRoutes = express.Router();

sampleRoutes.get("/", sampleController.index);
sampleRoutes.get("/create", sampleController.create);

sampleRoutes
  .route("/:id")
  .get(sampleController.show)
  .post(sampleController.store)
  .put(sampleController.update)
  .delete(sampleController.delete);

sampleRoutes.get("/:id/edit", sampleController.edit);

module.exports = { router: sampleRoutes, prefix: "/samples" };
