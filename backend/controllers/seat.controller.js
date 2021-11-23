"use strict";

const Seat = require("../models/seat.model");

exports.bookSeat = async(req, res) => {
try{


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
            seatNo: req.body.seatNo,
            row: req.body.row,
            // isBooked: req.body.isBooked,
            seatType: req.body.seatType,
            pointsRewarded: req.body.pointsRewarded,
        });

       const savedseat = await newSeat.save();
       res.send(savedseat);
    }
}
catch(error){
    res.send(error);
}
    
}