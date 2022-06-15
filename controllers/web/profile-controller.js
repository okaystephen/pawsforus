const profileController = {
  show: (req, res) => {
    const { user } = req;
    res.render("profile", {
      layout: false,
      // TODO: also return pets and analytics
      data: { user },
    });
  },
};

module.exports = profileController;
