"use strict";

const express = require("express");
const router = express.Router();
const bookingController = require("../../controllers/booking.controller");
const { checkAuth } = require("../../middlewares/authorization");

router.post("/create", checkAuth, bookingController.create);
router.post("/fetch", checkAuth, bookingController.fetch);

module.exports = router;
