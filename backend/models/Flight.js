// NOTE: CONSULT MEETING NOTES 2 AND 3 FOR MORE DATA ON OBJ. ATTRIBS AND SCHEMA NOTES!
const mongoose = require ('mongoose');

const flightSchema = new mongoose.Schema({
    departureFrom: {
        type: String,
        required: true
    },
    
    arrivalAt: {
        type: String,
        required: true
    },
    flightNo: {
        type: String,
        required: true,
        // Since a flight can only be going from one place to another...
        unique: true
    },
    arrivalDate: {
        type: Date,
        // DISABLING FOR TESTING
         required: true
    },
    departureDate: {
        type: Date,
        // DISABLING FOR TESTING
         required: true
    },
    //Seat object is an array; I dunno how this works yet so putting placeholder code here for now...
    seatStatus: {
        // FIX ME: putting default array for now; needs to be an array of object type 'Seat' which has 'SeatStatus' (boolean?) objects in it
        type: Array,
        // FIX ME: confirm whether this is required? how do we pass a constructor of certain type in js?
        // DISABLING FOR TESTING
         required: true
    },
    employedBy: {
        // FIX ME: is supposed to be an 'airline' type object so... I dunno?
        type: Airline,
        // DISABLING FOR TESTING
         required: true
    }

});

module.exports = flight = mongoose.model('flight', flightSchema);