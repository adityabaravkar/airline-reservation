"use strict";

const httpStatus = require("http-status");
const User = require("../models/user.model");
const { validationResult } = require("express-validator");

exports.update = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var error = new Error("Error in updating user.");
      error.errors = errors;
      error.status = httpStatus.CONFLICT;
      throw error;
    }
    const user = new User(req.body);
    let userDetail = await User.findByIdAndUpdate(
      req.body.id,
      user.updateTransform()
    );
    userDetail = await User.findById(req.body.id);
    res.status(httpStatus.ACCEPTED);
    res.send(userDetail.updateTransform());
  } catch (error) {
    next(error);
  }
};
