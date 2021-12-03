"use strict";

const express = require("express");
const router = express.Router();
const flightController = require("../../controllers/flight.controller");
const { checkAuth } = require("../../middlewares/authorization");

router.post("/create", checkAuth, flightController.create);
router.post("/fetch", checkAuth, flightController.fetch);

module.exports = router;
