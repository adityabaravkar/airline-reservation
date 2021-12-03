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
    departureDate: {
      type: Date,
      required: true,
      index: true,
    },
    price: {
      type: Number,
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
    const fields = ["customerId", "flightId", "departureDate", "price"];
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  },
});

bookingSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Booking", bookingSchema);
