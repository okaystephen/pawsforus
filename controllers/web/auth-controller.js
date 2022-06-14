const User = require("../../models/User");
const bcrypt = require("bcrypt");
const hashingConfig = require("../../config/hashing");

const authController = {
  showLogin: (req, res) => {
    res.render("main", {
      layout: false,
    });
  },
  postLogin: (req, res) => {
    //if no errors
    res.redirect("/home");
  },
  showRegister: (req, res) => {
    const errors = req.session.errors;
    req.session.errors = null;

    res.render("register", { layout: false, errors });
  },
  postRegister: async (req, res) => {
    //if no errors
    const { full_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(
      password,
      hashingConfig.bcrypt.saltRounds
    );

    try {
      const user = await User.create({
        full_name,
        email,
        password: hashedPassword,
      });

      req.login(user, (err) => {
        if (err) {
          res.status(500).send(err);
        }
        return res.redirect("/home");
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  home: (req, res) => {
    res.render("home", {
      layout: false,
    });
  },
  logout: (req, res) => {
    res.send("todo logout");
  },
};

module.exports = authController;
