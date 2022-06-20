const { validationResult, matchedData } = require("express-validator");
const matchService = require("../../services/match-service");

const matchController = {
  store: async (req, res) => {
    const errors = validationResult(req);
    const matched = matchedData(req, { locations: ["body"] });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    try {
      const result = await matchService.createMatch(matched);
      return res.json({
        data: result.match,
        meta: { matchFound: result.matchFound },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
};

module.exports = matchController;
