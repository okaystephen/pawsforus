const authController = {
  showLogin: (req, res) => {
    res.send("login form");
  },
  login: (req, res) => {
    res.send("todo login");
  },
  showRegister: (req, res) => {
    res.send("register form");
  },
  register: (req, res) => {
    res.send("todo register");
  },
  logout: (req, res) => {
    res.send("todo logout");
  },
};

module.exports = authController;
