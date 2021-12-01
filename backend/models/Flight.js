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
    // NOTE: This is the primary key for the flight objects
    flightNo: {
        type: String,
        required: true,
        // Since a flight can only be going from one place to another...
        //unique: true
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
    // NOTE: commenting out required fields to test DB update status
    seatStatus: [
        {
            seatNo: {
                type: Number,
                //required: true
            },
            row: {
                type: String,
                //required: true
            },
            isBooked: {
                type: Boolean,
                //required: true,
                default: false
            },
            seatType: {
                type: String,
                //required: true,
                default: 'Economy'
            },
            // Points rewarded to customer/user for booking this seat. Setting 5 as economy-default. Will be different for business class
            pointsRewarded: {
                type: Number,
                //required: true,
                default: 5
            }
        }
    ],
    /*seatStatus: {
        // FIX ME: putting default array for now; needs to be an array of object type 'Seat' which has 'SeatStatus' (boolean?) objects in it
        type: Array,
        // FIX ME: confirm whether this is required? how do we pass a constructor of certain type in js?
        // DISABLING FOR TESTING
         required: true
    },*/
    employedBy: {
        // FIX ME: is supposed to be an 'airline' type object so... I dunno?
        //type: Airline,
        
        // APPROACH 2: Trying to remodel the object as a mongo db model to mimic object behavior and fields 
        //type: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'airline'

        // DISABLING FOR TESTING
         //required: true
    }

});

module.exports = flight = mongoose.model('flight', flightSchema);