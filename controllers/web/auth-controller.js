const { validationResult } = require('express-validator');

const authController = {
  showLogin: (req, res) => {
    res.render('main', {
      layout: false
    })
  },
  postLogin: (req, res) => {
    //if no errors
    res.redirect('/home')
  },
  showRegister: (req, res) => {
    res.render('register', {
      layout: false
    })
  },
  postRegister: (req, res) => {
    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      errors = errors.errors;
      var details = {};

      for (let i = 0; i < errors.length; i++)
          details[errors[i].param + 'Error'] = errors[i].msg;

      res.render('register', {
        layout: false,
        input: req.body,
        details: details,
      })

    } else{
       //no errors found, redirect to home
       res.redirect('/home')
    }
  },
  home: (req, res) => {
    res.render('home', {
      layout: false
    })
  },
  logout: (req, res) => {
    res.send("todo logout");
  },
  match: (req, res) => {
    res.render('match', {
      layout: false
    })
  }
};

module.exports = authController;
