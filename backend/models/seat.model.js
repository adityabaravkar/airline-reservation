"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const seatSchema = new Schema(
  {
    seatNo: {
      type: String,
      required: true,
      unique: true,
    },
    isBooked: {
      type: Boolean,
    },
    seatType: {
      type: String,
      maxlength: 50,
    },
    pointsRewarded: {
        typr: Number,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Seat", seatSchema);