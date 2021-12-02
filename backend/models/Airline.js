const mongoose = require ('mongoose');

const airlineSchema = new mongoose.Schema ({
    hQ: {
        type: String,
        required: true
    },
    // NOTE: this will act like the primary key for Airline model
    name: {
        type: String,
        required: true,
        // making this unique so that it's easier to use this interface; in a real world scenario this would have to be coupled with location and/or be subject to trademark registrations/docs
        unique: true
    },
    userAcc: {
        type: [mongoose.Schema.Types.ObjectId],
        // disabled for now; testing for safety and then going to debug-enable this
        //required: true,
        ref: 'user'
    },
    flightsEmployed: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'flight'
    }
});

module.exports = airline = mongoose.model('airline', airlineSchema);