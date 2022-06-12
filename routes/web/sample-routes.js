const express = require("express");
const sampleController = require("../../controllers/web/sample-controller");
const sampleRoutes = express.Router();

sampleRoutes.get("/", sampleController.index);

sampleRoutes
  .route("/:id")
  .get(sampleController.show)
  .post(sampleController.store)
  .put(sampleController.update)
  .delete(sampleController.delete);

sampleRoutes.get("/:id/create", sampleController.create);
sampleRoutes.get("/:id/edit", sampleController.edit);

module.exports = sampleRoutes;
