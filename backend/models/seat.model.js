"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const seatSchema = new Schema(
  {
    customer : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    flight : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'flight',
    },
    seatNo: {
      type: String,
      required: true,
      unique: true,
    },
    row:{
      type: String,
      required: true,
    },
    // isBooked: {
    //   type: Boolean,
    // },
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