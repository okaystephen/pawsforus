const User = require("../../models/User");
const bcrypt = require("bcrypt");
const hashingConfig = require("../../config/hashing");
const { validationResult, matchedData } = require("express-validator");
const authService = require("../../services/auth-service");

const authController = {
  showLogin: (req, res) => {
    res.render("main", { layout: false });
  },
  postLogin: (req, res, next) => {
    const errors = validationResult(req);
    const matched = matchedData(req, { locations: ["body"] });
    
    // validation error
    if (!errors.isEmpty()) {
      return res.status(400).render("main", {
        layout: false,
        errors: errors.mapped(),
        inputs: matched,
      });
    }

    authService.authenticate("local", function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        const passportErrors = {
          email: {
            msg: info.message,
            value: "",
            param: "email",
            location: "body",
          },
        };
        return res.status(400).render("main", {
          layout: false,
          errors: passportErrors,
          inputs: matched,
        });
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }

        return res.redirect("/discover");
      });
    })(req, res, next);
  },
  showRegister: (req, res) => {
    res.render("register", { layout: false });
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
        return res.redirect("/select");
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  discover: (req, res) => {
    res.render("discover", {
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
  select: (req, res) => {
    res.render("select", {
      layout: false,
    });
  },
  chat: (req, res) => {
    res.render("chat", {
      layout: false,
    });
  },
  chatbox: (req, res) => {
    res.render("chatbox", {
      layout: false,
    });
  },
};

module.exports = authController;
