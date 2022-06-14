const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const hashingConfig = require("../config/hashing");
const User = require("../models/User");

const localStrategy = new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      const invalidInputResponse = {
        email: {
          value: email,
          msg: "Incorrect email or password",
          param: "email",
        },
      };

      if (!user) return done(null, false, invalidInputResponse);

      const compare = await bcrypt.compare(password, user.password);
      if (!compare) return done(null, false, invalidInputResponse);

      // user sent the correct credentials
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

passport.use(localStrategy);

module.exports = passport;
