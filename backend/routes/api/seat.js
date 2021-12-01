const express = require("express");
const router = express.Router();
const seatController = require("../../controllers/seat.controller");


router.post("/bookSeat", seatController.bookSeat);
router.post("/getBookings", seatController.getBookings);


module.exports = router;
