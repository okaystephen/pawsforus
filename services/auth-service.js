const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Pet = require("../models/Pet");

const localStrategy = new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) return done(null, false, { message: "Incorrect email or password" });

      const compare = await bcrypt.compare(password, user.password);
      if (!compare) return done(null, false, { message: "Incorrect email or password" });

      // user sent the correct credentials
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

passport.use(localStrategy);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id, "-password").lean().exec();
    const pets = await Pet.find({owner_id: user._id}).populate('uploads').lean().exec();
    user.pets = pets;
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

module.exports = passport;
