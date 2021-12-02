const express = require("express");
const router = express.Router();
const employeeController = require("../../controllers/employee.controller");


router.post("/addNewFlight", employeeController.addFlight);


module.exports = router;
