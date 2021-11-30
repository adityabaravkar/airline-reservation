const mongoose = require ('mongoose');

const airlineSchema = new mongoose.Schema ({
    hQ: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    userAcc: {
        type: mongoose.Scheme.Type.ObjectId,
        // disabled for now; testing for safety and then going to debug-enable this
        //required: true,
        ref: 'user'
    }
});

module.exports = airline = mongoose.model('airline', airlineSchema);