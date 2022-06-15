const ensureLoggedOut = (req, res, next) => {
  if (!req.isAuthenticated()) return next();

  return res.redirect("/discover");
};

module.exports = ensureLoggedOut;
