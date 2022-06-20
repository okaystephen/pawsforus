const { validationResult, matchedData } = require("express-validator");
const User = require("../../models/User");

const userController = {
  index: async (req, res) => {
    try {
      const users = await User.find({}, '-password').lean().exec();
      return res.json({ data: users });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  show: async (req, res) => {
    try {
      const user = await User.findById(req.params.id, '-password').lean().exec();
      return res.json({ data: user });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  update: async (req, res) => {
    const errors = validationResult(req);
    const matched = matchedData(req, { locations: ["params", "body"] });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    const { full_name, id } = matched;
    console.log(full_name, id);
    try {
      const updated = await User.findByIdAndUpdate(
        id,
        { full_name },
        { returnDocument: "after" }
      ).exec();

      if (!updated) {
        return res.status(404).json({
          errors: { message: "Not found" },
        });
      }

      return res.json(updated);
    } catch (error) {
      return res.status(500).send({ errors: error });
    }
  },
};

module.exports = userController;
