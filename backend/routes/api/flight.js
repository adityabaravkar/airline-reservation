// FIX ME: ERROR ROUTES NOT WORKING FOR THIS FILE! WE GET 404 INSTEAD OF 400!
const express = require ('express');
const router = express.Router();
// This helps us validate post entries and makes giving back errors a lot easier!
const {check, validationResult} = require('express-validator/check');

// @route   POST api/flight
// @desc    Add Flight data
// @access Public

router.post(
    '/',
    [
        check('departureFrom', 'Please enter the departure location name.').not().isEmpty(),
        check('arrivalAt', 'Please enter the arrival location name.').not().isEmpty(),
        check('flightNo', 'Please enter a flight Number.').not().isEmpty()
        // FIX ME: now, how do I check for ___ ... using validator
        //         putting placeholder code below for now...
        // Date fields
        //check('arrivalDate','Please enter the arrival date.').not().isEmpty(),
        //check('departureDate','Please enter the departure date.').not().isEmpty(),

        // Seat seatStatus[] fields (i.e. an array of a custom object!)
        //check('arrivalDate','Please enter the Seat status of all Seats on flight.').not().isEmpty(),

        // Airline field (i.e. a custom object denoting the user/owner of the flight)
        //check('arrivalDate','Please enter Flight Employer.').not().isEmpty(),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            // returns an array of the auto-generated errors and error descriptions
            return res.status(400).json({ errors: errors.array()});
        }
        // prints the body of the request which is defined above
        console.log(req.body);
        // Send the following response using the API
        res.send ('Flight router page');
    }
);

module.exports = router;