// FIX ME: ERROR ROUTES NOT WORKING FOR THIS FILE! WE GET 404 INSTEAD OF 400!
const express = require ('express');
const router = express.Router();
// This helps us validate post entries and makes giving back errors a lot easier!
const {check, validationResult} = require('express-validator/check');
const Flight = require ("../../models/Flight");
const User = require ('../../models/user.model');
const Airline =  require ("../../models/Airline")

// @route   GET api/flight/me
// @desc    get specific Flight data
// @access  Public

router.get('/me', async (req, res) => {
    try {
        const flight = await Flight.findOne({ user: req.user.id }).populate ('user', ['email', 'fName', 'lName']);
        if (!flight){
            return res.status (400).json ({ msg: 'No flight found for this user. '});
        }
    } catch (err) {
        console.error (err.message);
        res.status(500).send('Error: not a valid query!');
    }
});

// @route   POST api/flight/me
// @desc    Add Flight data
// @access  Public


router.post(
    '/me',
    [
        check('departureFrom', 'Please enter the departure location name.').not().isEmpty(),
        check('arrivalAt', 'Please enter the arrival location name.').not().isEmpty(),
        check('flightNo', 'Please enter a flight Number.').not().isEmpty(),
        // FIX ME: now, how do I check for ___ ... using validator
        //         putting placeholder code below for now...
        // Date fields
        check('arrivalDate','Please enter the arrival date.').not().isEmpty(),
        check('departureDate','Please enter the departure date.').not().isEmpty(),

        // Seat seatStatus[] fields (i.e. an array of a custom object!)
        check('seatStatus[]','Please enter the Seat status of all Seats on flight.').not().isEmpty(),

        // Airline field (i.e. a custom object denoting the user/owner of the flight)
        check('isEmployedBy','Please enter Flight Employer.').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            // returns an array of the auto-generated errors and error descriptions
            return res.status(400).json({ errors: errors.array()});
        }
        // if the request is valid, we do the following:
        const {
            departureFrom,   // departureFrom
            arrivalAt,     // arrivalAt
            flightNo,      // flightNo; NOTE: used as primary key
            arrivalDate,     // arrivateDate
            departureDate,   // departureDate
            seatStatus,       // seatStatus[]
            isEmployedBy     // employedBy
        } = req.body

        const flightFields ={};

        // Initialize and declare-define a flight object
        // TEST: JUST IMPLEMENTED AIRLINE OBJS
        //flightFields.airline = req.airline.id;

        if (departureFrom){
            flightFields.departureFrom = departureFrom;
        }
        if (arrivalAt){
            flightFields.arrivalAt = arrivalAt;
        }
        if (flightNo){
            flightFields.flightNo = flightNo;
        }
        if (arrivalDate){
            flightFields.arrivalDate = Date.parse(arrivalDate);
        }
        if (departureDate){
            flightFields.departureDate = Date.parse(departureDate);
        }
        if (seatStatus){
            flightFields.seatStatus = seatStatus.split(',').map(val => val.trim());
        }
        // NOTE: This clause relies upon the Airline Model implementation!
        if (isEmployedBy){
            //flightFields.isEmployedBy = req.airline.id;
        }

        // Implementing find and find + update clauses for model
        // FIX ME: THIS IS FAILING!
        try{
            // NOTE: for testing!
            console.log ('got till try start');
            let flight = await Flight.findOne({ flightNo });
            console.log ('got till here.');
            // if flight exists already, update its values/contents
            if (flight){
                // NOTE: for testing!
                console.log('found flight in DB!');
                flight = await Flight.findOneAndUpdate(
                    // NOTE: Would this be 'req.flightNo.id'? Since the flightNo is a unique attrib, do we really need to log/search by object id?  
                    { flight: req.flightNo },
                    { $set: flightFields },
                    { new: true }  
                );
                return res.json(flight);
            }
            // NOTE: for testing!
            console.log('Flight not found. Creating obj for model...');
            // since it was not found...
            flight = new Flight(flightFields);
            // Save as new obj/field to DB
            await flight.save();
            res.json(flight);
        }
        catch(err){
            console.error (err.message);
            res.status(500).send('Server Error: Flight');
        }

        res.send('Hellaye; check check');
        
        


        // prints the body of the request which is defined above
        //console.log(req.body);
        // Send the following response using the API
        //res.send ('Flight router page');
    }
);

// @route   GET api/flight
// @desc    get all Flight-objects!
// @access  Public

router.get('/', async (req, res) => {
    try {
        const flights  = await Flight.find().populate(['flightNo', 'seatStatus']); // make into 'populate('airline', ['flightNo', 'seatStatus'])' once airlineDB implemented
        res.json(flights);
    } catch (err) {
        console.error ('Get all flights error:');
        res.status(500).send ('Get all flights: Server Error');
    }
});

module.exports = router;