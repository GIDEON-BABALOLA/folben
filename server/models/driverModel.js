const mongoose = require('mongoose');
const driverSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    vehicle : {
        type : String,
        required : true
    },
    plateNumber: {
        type : String,
        required : true,
        unique : true
    }
}, {
    timestamps : true
});

module.exports = mongoose.model('Driver', driverSchema);



