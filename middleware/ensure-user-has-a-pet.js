const ensureUserHasAPet = (req, res, next) => {
  if (req.user.pets.length) return next();

  return res.redirect("/add-pet");
};

module.exports = ensureUserHasAPet;
