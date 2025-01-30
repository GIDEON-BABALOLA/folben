const path = require("path")
const Booking = require(path.join(__dirname, "..", "models", "bookingModel.js"))
const Driver = require(path.join(__dirname, "..", "models", "driverModel.js"))
const bookARide = async(req, res) => {
    try{
const {
currentLocation,
destination,
amount,
transactionReference
 } = req.body
 if(!currentLocation  || !destination || !amount || !transactionReference){
    throw new userError("Please Fill In All The Fields", 400)
}
const availableDrivers = await Driver.find().lean();
const randomIndex = Math.floor(Math.random() * availableDrivers.length);
const selectedDriver = availableDrivers[randomIndex];
 const newUser = await Booking.create({ 
    currentLocation,
    dateBooked : new Date(),
    destination,
    amount,
    transactionReference,
    userId : req.user._id,
    driver : selectedDriver.username,
    plateNumber : selectedDriver.plateNumber
 })
 res.status(201).json({ message: "Creation of User Was Successful", user: newUser });
    }
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "getAllBookingsError.txt", "adminError")  
        if(error instanceof adminError){
            return res.status(error.statusCode).json({ message : error.message})
        }
        else{
            return res.status(500).json({message : "Internal Server Error"})
    }    
}
}
const getAllBookings = async(req, res) => {
    try{
        const bookings = await Booking.find()
        const bookingsCount = bookings.length
    res.status(200).json({ message : "Retrieval Of Bookings Was Successfull", bookings : bookings, count : bookingsCount})          
        }
        catch(error){
console.log(error)
logEvents(`${error.name}: ${error.message}`, "getAllBookingsError.txt", "adminError")
if(error instanceof adminError){
return res.status(error.statusCode).json({ message : error.message})
}else{
return res.status(500).json({message : "Internal Server Error"})
            }
        }
}

module.exports= { bookARide, getAllBookings}