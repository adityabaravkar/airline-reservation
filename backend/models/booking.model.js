"use strict";

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    customerId: {
      type: String,
      required: true,
      index: true,
    },
    flightId: {
      type: String,
      required: true,
      index: true,
    },
    departureFrom: {
      type: String,
      required: true,
      index: true,
    },
    arrivalAt: {
      type: String,
      required: true,
      index: true,
    },
    departureDate: {
      type: Date,
      required: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
    },
    seatNo: {
      type: Number,
      required: true,
    },
    row:{
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "customerId",
      "flightId",
      "departureFrom",
      "arrivalAt",
      "departureDate",
      "price",
      "seatNo",
      "row",
    ];
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  },
});

bookingSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Booking", bookingSchema);
