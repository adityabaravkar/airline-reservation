"use strict";

const { check } = require("express-validator");
const User = require("../models/user.model");

module.exports = {
  create: [
    check("email", "Please enter valid email.")
      .isEmail()
      .bail()
      .custom((value) => User.checkDuplicateEmailError(value)),
    check("password", "Invalid password.").isLength({ min: 6, max: 128 }),
    check("fname", "Please enter first name.")
      .isLength({ max: 128 })
      .notEmpty(),
    check("lname", "Please enter last name.").isLength({ max: 128 }).notEmpty(),
    check("address", "Please enter address.").isLength({ max: 12800 }),
    check("phoneNumber", "Please enter valid phone number.")
      .optional()
      .isMobilePhone(),
  ],
};
