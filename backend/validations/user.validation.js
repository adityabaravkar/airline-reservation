"use strict";

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  create: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      fname: Joi.string().max(128).required(),
      lname: Joi.string().max(128).required(),
      address: Joi.string().max(12800),
      phoneNumber: Joi.string().max(128),
    },
  },
};
