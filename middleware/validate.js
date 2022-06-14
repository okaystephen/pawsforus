const { validationResult } = require("express-validator");

/**
 * Use this to immediately return errors to the client if the validation fails.
 * If`redirectOnError` is true, redirect to the same route instead.
 * The errors will be stored in `req.session.errors` so you can access them from other handlers.
 * This handles the error formating so that the final request handler would be cleaner.
 *
 * @param {Array} validations an array of validation chains
 * @param {boolean} redirectOnError if set, redirects to the same route with the errors accessible via `req.session.errors`
 */
const validate = (validations, redirectOnError) => {
  return async (req, res, next) => {
   
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    console.log(errors);
    if (errors.isEmpty()) return next();

    if (redirectOnError) {
      // store errors to session so the original route can have access to them
      req.session.errors = errors.mapped();
      return res.redirect(req.path);
    }

    return res.status(400).json({ errors: errors.mapped() });
  };
};

module.exports = validate;
