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
    //if no errors
    res.redirect('/home')
  },
  home: (req, res) => {
    res.render('home', {
      layout: false
    })
  },
  logout: (req, res) => {
    res.send("todo logout");
  },
};

module.exports = authController;
