const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const petUploadSchema = new mongoose.Schema(
  {
    pet_id: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
    upload_id: { type: mongoose.Schema.Types.ObjectId, ref: "Upload" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

petUploadSchema.plugin(mongooseDelete, { deletedAt: true });

const PetUpload = mongoose.model("PetUpload", petUploadSchema);

module.exports = PetUpload;
