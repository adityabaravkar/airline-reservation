"use strict";

const httpStatus = require("http-status");
const Booking = require("../models/booking.model");
const User = require("../models/user.model");
const Flight = require("../models/flight.model");

exports.create = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ _id: req.body.customerId });
    console.log(user);

    if (!user) {
      return res.status(404).send({ message: "User does not exist" });
    }
  
    const flight = await Flight.findOne({ _id: req.body.flightId });
    console.log(flight);
  
    if (!flight) {
      return res.status(404).send({ message: "Flight does not exist" });
    }
    const newMileagePoints = user.mileagePoints;
    if(req.body.checked){
       newMileagePoints = flight.miles;
    }else{
       newMileagePoints = newMileagePoints + flight.miles;
    }
    
    await User.updateOne({_id: user._id}, {mileagePoints : newMileagePoints});

    const booking = new Booking(req.body);
    const savedBooking = await booking.save();
    res.status(httpStatus.CREATED);
    res.send(savedBooking.transform());

  } catch (error) {
    return next(error);
  }
};

exports.cancelBooking = async (req, res, next) => {
  try{
  const bookingId = req.body.bookingId;
  const user = await User.findOne({ _id: req.body.customerId });

  if (!user) {
    return res.status(404).send({ message: "User does not exist" });
  }

  const flight = await Flight.findOne({ _id: req.body.flightId });

  if (!flight) {
    return res.status(404).send({ message: "Flight does not exist" });
  }
  
  //fix this
  const newMileagePoints = user.mileagePoints - flight.miles;
  await User.updateOne({userID: user._id}, {mileagePoints : newMileagePoints});

  Booking.deleteOne({_id : bookingId}, (err, result) =>{
    if(err){
      console.log(err);
    }else{
      re.status(200).send(result);
    }
  });
  }catch(error){
    return next(error);
  }
}

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
    if (!criteria.page) {
      criteria.page = 1;
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
