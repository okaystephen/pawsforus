const authController = {
  showLogin: (req, res) => {
    res.send("login form");
  },
  login: (req, res) => {
    res.send("todo login");
  },
  showRegister: (req, res) => {
    const errors = req.session.errors;
    req.session.errors = null;

    res.render("create-account", { layout: false, errors });
  },
  register: (req, res) => {
    res.send('"todo register"');
  },
  logout: (req, res) => {
    res.send("todo logout");
  },
};

module.exports = authController;
