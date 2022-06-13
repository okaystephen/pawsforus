const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const User = require("../models/User");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (user) return done(null, user);

        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

module.exports = passport;
