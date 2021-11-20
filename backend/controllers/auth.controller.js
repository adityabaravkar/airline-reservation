"use strict";

const User = require("../models/user.model");
const httpStatus = require("http-status");
const { validationResult } = require("express-validator");

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
