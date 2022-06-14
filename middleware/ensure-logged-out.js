const ensureLoggedOut = (req, res, next) => {
  if (!req.isAuthenticated()) return next();

  return res.redirect("back");
};

module.exports = ensureLoggedOut;
