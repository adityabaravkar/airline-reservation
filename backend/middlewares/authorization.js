const passport = require("passport");
const httpStatus = require("http-status");

const APIError = require("../utils/APIError");

exports.checkAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    if (error || !user) {
      throw new APIError(
        error ? error.message : "Unauthorized",
        httpStatus.UNAUTHORIZED
      );
    } else {
      req.user = user;
    }
    return next();
  })(req, res, next);
};
