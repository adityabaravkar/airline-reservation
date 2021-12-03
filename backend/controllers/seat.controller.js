"use strict";

const Flight = require("../models/flight.model");
const Seat = require("../models/seat.model");
const User = require("../models/user.model");

exports.bookSeat = async(req, res) => {
  
    const user = await User.findOne({email : req.body.email});

    if(!user){
        return res.status(404).send({message: 'User does not exist'});
    }
    
    const flight = await Flight.findOne({email : req.body.flightNo});

    if(!flight){
        return res.status(404).send({message: 'Flight does not exist'});
    }

    const seat = await Seat.findOne({
        seatNo : req.body.seatNo,
    });

    if(seat){
        res.json({
            status: true,
            message: "Seat already booked",
        });
    }else{
        const newSeat = new Seat({
            customer: user._id,
            flight: flight._id,
            seatNo: req.body.seatNo,
            row: req.body.row,
            // isBooked: req.body.isBooked,
            seatType: req.body.seatType,
            pointsRewarded: req.body.pointsRewarded,
        });

       const savedseat = await newSeat.save();
       res.status(200).send(savedseat);
    }
    
}

exports.getBookings = async(req, res) => {
    const customerId = req.body.customerId; 
    const seat = await Seat.findById({customer: customerId});

    if(seat.length){
        res.status(200).send(seat);
    }else{
        res.send('No bookings are available');
    }
}


// exports.updateSeat = async(req, res) => {
//     const seatNo = req.body.seatNo;
//     const newSeatNo = req.body.newSeatNo;

// }