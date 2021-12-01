"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const bookingSchema = new Schema(
    // {
    //   customer : {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'User',
    //   },
    //   flight : {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'flight',
    //   },
    //   seat : {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Seat',
    //   },
    // },
    {
      timestamps: true,
    }
  );
  
  
  module.exports = mongoose.model("Booking", bookingSchema);