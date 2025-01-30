const path = require("path")
const User = require(path.join(__dirname, "..", "models", "userModel.js"))
const Booking = require(path.join(__dirname, "..", "models", "bookingModel.js"))
const { validateEmail, validatePassword } = require(path.join(__dirname, "..", "utils", "validator.js"))
const { generateAccessToken, generateRefreshToken} = require(path.join(__dirname, "..", "config", "tokenConfig.js"))
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const { userError, validatorError } = require(path.join(__dirname, "..", "utils", "customError.js"))
const _ = require('lodash');
const bcrypt = require("bcrypt")
const registerUser = async (req, res) => {
try{
const { 
matriculationNumber,
username,
mobile,
email,
schoolName,
password,
} = req.body;
if(!matriculationNumber || !username || !mobile || !email || !schoolName || !password){
        throw new userError("Please Fill In All The Fields", 400)
}
await validateEmail(email)
await validatePassword(password)
const foundUser = await User.findOne({email : email})
const foundMobile = await User.findOne({mobile : mobile})
const foundMatriculationNumber = await User.findOne({matriculationNumber : matriculationNumber})
if(foundUser) {
    throw new userError("User Already Exists", 400)
}
if(foundMobile){
    throw new userError("Phone Number Has Been Used", 400)
}
if(foundMatriculationNumber){
    throw new userError("This Matriculation Number Has Been Registered With Another Account", 400)
}
const hashedPassword = await bcrypt.hash(password, 10);
const newUser = await User.create({ 
    matriculationNumber,
    username,
    mobile,
    email,
    schoolName,
    password : hashedPassword
 })
 res.status(201).json({ message: "Creation of User Was Successful", user: newUser });
}catch(error){
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "registerUserError.txt", "userError")
    if (error instanceof userError) {
       return  res.status(error.statusCode).json({ message : error.message})
    }
    else if(error instanceof validatorError){
        return  res.status(error.statusCode).json({ message : error.message})  
    }
        else{
    return res.status(500).json({message : "Internal Server Error"})
    }
}
}

const loginUser = async(req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            throw new userError("Please Provide An Email And A Password", 400)
        }
        await validateEmail(email)
        await validatePassword(password)
        const foundUser = await User.findOne({email : email})
        if(!foundUser){
            throw new userError("Your Account Does Not Exist", 404)
        }
        const match = await bcrypt.compare(password, foundUser.password)
        if(foundUser && match){
            const id = foundUser?._id.toString()
            const refreshToken = generateRefreshToken(id, foundUser.role)
            await User.findByIdAndUpdate(id, {refreshToken : refreshToken}, { new : true})
            res.cookie("refreshToken", refreshToken, { httpOnly : true, maxAge: 60 * 60 * 1000 * 24 * 7, sameSite : "None",  secure : false })
            //Seven Day Refresh Token
        const detailsOfUserToBeSent = _.omit(foundUser.toObject(), "refreshToken")
        res.status(201).json({...detailsOfUserToBeSent, accessToken : generateAccessToken(id, foundUser.role)})
         }
        else{
            throw new userError("Invalid Credentials", 401)
        }
        }catch(error){
            logEvents(`${error.name}: ${error.message}`, "loginUserError.txt", "userError")
            if (error instanceof userError) {
               return  res.status(error.statusCode).json({ message : error.message})
            }else if(error instanceof validatorError){
                return  res.status(error.statusCode).json({ message : error.message})  
            }
            else{
                return res.status(500).json({message : "Internal Server Error"})
                }
        }
}


const getUser = async (req, res) => {
    const { _id } = req.user
    try{
        const user = await User.findById({_id : _id})
        if(!user){
            throw new userError("You Are Not Logged In", 401)
        }
        const detailsOfUserToBeSent = _.omit(user.toObject(), "refreshToken", "password"
        )
            res.status(200).json(detailsOfUserToBeSent)
    }
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "getUserError.txt", "userError")
        if (error instanceof userError) {
           return  res.status(error.statusCode).json({ message : error.message})
        }else if(error instanceof validatorError){
            return  res.status(error.statusCode).json({ message : error.message})  
        }
        else{
            return res.status(500).json({message : "Internal Server Error"})
            } 
    }
}

const getMyBookings = async(req, res) => {
    try{
        const bookings = await Booking.find({ userId: req.user._id })
        const bookingsCount = bookings.length
    res.status(200).json({ message : "Retrieval Of Booking Was Successfull", bookings : bookings, count : bookingsCount})          
        }
        catch(error){
logEvents(`${error.name}: ${error.message}`, "getMyBookingsError.txt", "userError")
if(error instanceof userError){
return res.status(error.statusCode).json({ message : error.message})
}else{
return res.status(500).json({message : "Internal Server Error"})
            }
        }
}
const logoutUser = async(req, res) => {
    const cookies = req.cookies
    try{
        if(!cookies?.refreshToken){
            throw new userError("You Are Not Logged In", 401)
        }
        const refreshToken = cookies.refreshToken;
        const user = await User.findOne({refreshToken : refreshToken})
        if(!user){
            res.clearCookie("refreshToken", {httpOnly: true, sameSite : "None" , secure  : false })
            return res.status(200).json({message : "Successfully Logged Out", "success" : true})
        }
        user.refreshToken = ""
        await user.save();      
        res.clearCookie("refreshToken", {httpOnly: true,  sameSite : "None", secure : false })
        return res.status(200).json({message : "Successfully Logged Out now", "success" : true})
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "logoutUserError.txt", "userError")
        if (error instanceof userError) {
            return res.status(error.statusCode).json({ error : error.message})
        }
        else{
            return res.status(500).json({error : "Internal Server Error"})
            }
    }
}
module.exports = {
    registerUser,
    loginUser, 
    logoutUser,
    getMyBookings,
    getUser
}