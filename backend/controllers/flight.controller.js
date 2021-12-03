"use strict";

const httpStatus = require("http-status");
const Flight = require("../models/flight.model");

exports.create = async (req, res, next) => {
  try {
    console.log(req.body);
    const flight = new Flight(req.body);
    const savedFlight = await flight.save();
    res.status(httpStatus.CREATED);
    res.send(savedFlight.transform());
  } catch (error) {
    console.log(error);
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
    if (criteria.departureFrom) {
      filter.departureFrom = {
        $regex: criteria.departureFrom,
        $options: "i",
      };
    }
    if (criteria.arrivalAt) {
      filter.arrivalAt = {
        $regex: criteria.arrivalAt,
        $options: "i",
      };
    }
    if (criteria.departureDate) {
      filter.departureDate = {
        $eq: criteria.departureDate,
      };
    }
    if (!criteria.page) {
      criteria.page = 1;
    }
    const pager = { page: criteria.page, limit: 10 };
    const flightList = await Flight.paginate(filter, pager);
    const response = {};
    response.payLoad = flightList.docs;
    const { total, limit, page, pages } = flightList;
    response.pager = { total, limit, page, pages };
    res.status(httpStatus.OK);
    res.send(response);
  } catch (error) {
    next(error);
  }
};
