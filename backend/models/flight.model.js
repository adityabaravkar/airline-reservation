"use strict";

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const flightSchema = new Schema(
  {
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
      maxlength: 50,
      required: true,
    },
    arrivalDate: {
      type: Date,
      maxlength: 50,
      required: true,
    },
    price: {
      type: Number,
      maxlength: 50,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

flightSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "id",
      "departureFrom",
      "arrivalAt",
      "departureDate",
      "arrivalDate",
      "price",
    ];
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  },
});

flightSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Flight", flightSchema);
