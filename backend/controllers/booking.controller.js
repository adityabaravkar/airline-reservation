"use strict";

const httpStatus = require("http-status");
const Booking = require("../models/booking.model");

exports.create = async (req, res, next) => {
  try {
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();
    res.status(httpStatus.CREATED);
    res.send(savedBooking.transform());
  } catch (error) {
    return next(error);
  }
};

exports.fetch = async (req, res, next) => {
  try {
    const filter = {};
    const criteria = req.body;
    if (criteria.id) {
      filter._id = criteria.id;
    }
    if (criteria.customerId) {
      filter.customerId = criteria.customerId;
    }
    if (criteria.flightId) {
      filter.flightId = criteria.flightId;
    }
    if (criteria.departureDate) {
      filter.departureDate = {
        $eq: criteria.departureDate,
      };
    }
    const pager = { page: criteria.page, limit: 10 };
    const bookingList = await Booking.paginate(filter, pager);
    const response = {};
    response.payLoad = bookingList.docs;
    const { total, limit, page, pages } = bookingList;
    response.pager = { total, limit, page, pages };
    res.status(httpStatus.OK);
    res.send(response);
  } catch (error) {
    next(error);
  }
};
