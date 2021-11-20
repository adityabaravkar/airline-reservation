"use strict";

const User = require("../models/user.model");
const httpStatus = require("http-status");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const secret = config.get("secret");

exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var error = new Error("Error in user registration.");
      error.errors = errors;
      error.status = httpStatus.CONFLICT;
      throw error;
    }
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(httpStatus.CREATED);
    res.send(savedUser.transform());
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findAndGenerateToken(req.body);
    const payload = { sub: user.id };
    const token = jwt.sign(payload, secret, {
      expiresIn: 1008000,
    });
    return res.json({
      message: "success",
      user: user.transform(),
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
