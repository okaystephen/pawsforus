const ensureUserHasAPet = (req, res, next) => {
  console.log(req.user.pets.length);
  if (req.user.pets.length) return next();

  return res.redirect("/add-pet");
};

module.exports = ensureUserHasAPet;
