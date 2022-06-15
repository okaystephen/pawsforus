const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    about_me: { type: String, required: true },
    birthdate: { type: Date, required: true },
    breed: { type: String, required: true },
    gender: { type: String, required: true },
    status: { type: String, required: true },
    weight: { type: String, required: true },
    images: { type: String, required: true },
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
