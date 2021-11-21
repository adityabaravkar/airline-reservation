const passport = require("passport");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/user.model");
const config = require("config");
const secret = config.get("secret");

function auth() {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = secret;
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, callback) {
      User.findById(jwt_payload.sub, function (err, user) {
        if (err) {
          return callback(err, false);
        }
        if (user) {
          callback(null, user.transform());
        } else {
          callback(null, false);
        }
      });
    })
  );
}

exports.auth = auth;
