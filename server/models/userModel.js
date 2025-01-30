const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    matriculationNumber : {
        type : String,
        required : true,
        unique : true
    },
    username : {
        type : String,
        required : true
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
    schoolName : {
       type : String,
       required : true
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
        default : "user",
        required : true,
        enum : [ "user", "admin"]
    }
}, {
    timestamps : true
});

module.exports = mongoose.model('User', userSchema);



