const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    currentLocation : {
        type : String,
        required : true
    },
    dateBooked : {
        type : Date,
        required : true
    },
    destination: {
        type : String,
        required : true
    },
    amount : {
        type : String,
        required : true,
    },
    driver : {
       type : String,
       required : true,
    },
    plateNumber : {
        type : String,
        required : true
    },
    transactionReference:{
        type:String,
        required:true,
    },
    userId  : {
        type : String,
        required : true
    }
}, {
    timestamps : true
});

module.exports = mongoose.model('Booking', bookingSchema);



