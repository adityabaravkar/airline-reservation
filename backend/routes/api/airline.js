const express = require('express');
const router = express.Router();

// This helps us validate post entries and makes giving back errors a lot easier!
const {check, validationResult} = require('express-validator/check');
const Flight = require ("../../models/Flight");
const User = require ('../../models/user.model');
const Airline =  require ("../../models/Airline")


// @route   GET api/airline/this
// @desc    get specific airline data
// @access  Public

router.get('/this', async (req, res) => {
    try {   
        const airline = await Airline.findOne({ user: req.user.id }).populate ('user', ['hQ', 'name']);

        if (!airline){
            return res.status(400).json({ msg: 'No airline found for this user'});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error: not a valid query!');
    }    

});


// @route   POST api/airline/this
// @desc    Add flight data
// @access  Public

router.post('/this', [
    // going to perform checks for valid query for each data file; this is what the validator is for
    check('hQ').not().isEmpty(),
    check('name').not().isEmpty(),
    check('userAcc').not().isEmpty()

],
async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const {
        hQ,
        name,
        userAccs,
        flights
    } = req.body

    console.log ('Recieved POST request for this...');
        
    const airlineFields = {};

    // Initializing airline object

    // not required yet; will debug and implement
    
    airlineFields.hQ = hQ;
    airlineFields.name = name;
    airlineFields.flights = flights;

    // takes input as csv; is an array so make sure you pass the POST values as an array! it will overwrite on update!
    if (userAccs){
        // switching to take object id as direct input
        airlineFields.userAccs = userAccs.split(',').map(userAc => userAc.trim());
    }
    // takes input as csv; stores flight objects by id; similar to userAcc
    if (flights){
        airlineFields.flights = flights.split(',').map(flight => flight.trim());
    }
    
    // now we implement find() and find-and-update() clauses
    
    try {
        console.log ('looking for airline via name...');
        let airline = await Airline.findOne({ name });
        if (airline){
            console.log ('airline found via name!');
            airline = await Airline.findOneAndUpdate(
                { airline: req.name },
                { $set: airlineFields },
                {new: true }
            );
            return res.json(airline);
        }

        console.log('Airline not found. Creating object for airline model ...');
        airline = new Airline (airlineFields);
        await airline.save();
        res.json(airline);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error: Airline');
    }

    res.send ('Hellaye; check check air-PLAN');
    }
);

module.exports = router;