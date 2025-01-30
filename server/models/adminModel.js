const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    mobile : {
        type : String,
        required : true,
        unique : true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    accessToken : {
        type:String
    },
    refreshToken : {
        type : String
    },
    role : {
        type : String,
        default : "admin",
        required : true,
        enum : [ "user", "admin"]
    },
}, {
    timestamps : true
});

module.exports = mongoose.model('Admin', adminSchema);



