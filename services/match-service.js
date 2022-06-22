const ObjectId = require("mongoose").Types.ObjectId;
const Match = require("../models/Match");
const Pet = require("../models/Pet");
const chatService = require("./chat-service");

const matchService = {
  createMatch: async ({ pet_id, liked_pet_id }) => {
    // Create your side in the matches table
    let yourMatchSide = await Match.create({ pet_id, liked_pet_id });

    const returnObj = {
      match: yourMatchSide,
      matchFound: false,
    };

    // Afterwards, check if another record exists where pet_id = liked_pet_id AND liked_pet_id = pet_id
    let otherMatchSide = await Match.findOne({
      pet_id: liked_pet_id,
      liked_pet_id: pet_id,
    }).exec();

    // If it exists, then it's a match.
    if (otherMatchSide) {
      console.log("IS A MATCH");
      const user_ids = (
        await Pet.find({ _id: { $in: [pet_id, liked_pet_id] } })
      ).map((pet) => pet.owner_id);

      const result = await chatService.createRoom({
        status_type: Pet.getStatuses().FOR_MATCHING,
        user_ids: user_ids,
      });
      console.log("chat room created");
      returnObj.matchFound = true;
    }

    return returnObj;
  },
  getMatchedPets: async ({ selectedPetId }) => {
    let matchedPets = await Match.aggregate()
      .match({ pet_id: ObjectId(selectedPetId) })
      .lookup({
        from: "matches",
        let: { pi: "$pet_id", lpi: "$liked_pet_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$$pi", "$liked_pet_id"] },
                  { $eq: ["$$lpi", "$pet_id"] },
                ],
              },
            },
          },
        ],
        as: "res",
      })
      .match({ res: { $ne: [] } })
      .exec();

    matchedPets = await Match.populate(matchedPets, {
      path: "pet_id liked_pet_id",
      populate: { path: "uploads" },
      options: { lean: true },
    });

    return { matchedPets };
  },
};

module.exports = matchService;
