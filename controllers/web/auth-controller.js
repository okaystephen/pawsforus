const User = require("../../models/User");
const bcrypt = require("bcrypt");
const hashingConfig = require("../../config/hashing");
const { validationResult, matchedData } = require("express-validator");

const authController = {
  showLogin: (req, res) => {
    let errors = null;
    // validation error
    if (req.session.errors) {
      errors = req.session.errors;
      req.session.errors = null;
    }
    // Passport error
    else if (req.session.messages instanceof Array) {
      errors = {
        email: {
          msg: req.session.messages[0],
          value: "",
          param: "email",
          location: "body",
        },
      };

      req.session.messages = null;
    }

    if (errors) res.status(400);

    res.render("main", { layout: false, errors });
  },
  postLogin: (req, res) => {
    //if no errors
    res.redirect("/home");
  },
  showRegister: (req, res) => {
    let errors = null;
    if (req.session.errors) {
      errors = req.session.errors;
      req.session.errors = null;
    }

    if (errors) res.status(400);
    console.log(req.body);
    res.render("register", { layout: false, errors, inputs: req.body });
  },
  postRegister: async (req, res) => {
    const errors = validationResult(req);
    const matched = matchedData(req, { locations: ["body"] });

    if (!errors.isEmpty()) {
      return res.status(400).render("register", {
        layout: false,
        errors: errors.mapped(),
        inputs: matched,
      });
    }

    //if no errors
    const { full_name, email, password } = matched;
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
    req.logout((err) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.redirect("/");
    });
  },
  match: (req, res) => {
    res.render("match", {
      layout: false,
    });
  },
};

module.exports = authController;
