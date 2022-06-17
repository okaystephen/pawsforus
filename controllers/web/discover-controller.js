const discoverController = {
  index: (req, res) => {
    res.render("discover", {
      layout: false,
    });
  },
};

module.exports = discoverController;
