"use strict";

const express = require("express");
const router = express.Router();
const bookingController = require("../../controllers/booking.controller");
const { checkAuth } = require("../../middlewares/authorization");

router.post("/create", checkAuth, bookingController.create);
router.post("/fetch", checkAuth, bookingController.fetch);
router.post("/cancelBooking", checkAuth, bookingController.cancelBooking);
router.post("/updateBooking", checkAuth, bookingController.updateBooking);

module.exports = router;
