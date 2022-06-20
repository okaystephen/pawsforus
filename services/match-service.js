const Match = require("../models/Match");

const matchService = {
  createMatch: async ({ pet_id, liked_pet_id }) => {
    // Find one or create your side in the matches table
    let yourMatchSide = await Match.findOneAndUpdate(
      { pet_id },
      { liked_pet_id },
      { new: true, upsert: true, rawResult: true }
    ).exec();

    const returnObj = {
      match: yourMatchSide.value,
      matchFound: false,
      isNew: !yourMatchSide.lastErrorObject.updatedExisting,
    };

    // Afterwards, check if another record exists where pet_id = liked_pet_id AND liked_pet_id = pet_id
    let otherMatchSide = await Match.findOne({
      pet_id: liked_pet_id,
      liked_pet_id: pet_id,
    }).exec();

    // If it exists, then it's a match.
    if (otherMatchSide) {
      console.log("IS A MATCH");
      returnObj.matchFound = true;
    }

    return returnObj;
  },
};

module.exports = matchService;
