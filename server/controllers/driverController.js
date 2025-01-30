const path = require("path");
const Driver = require(path.join(__dirname, "..", "models", "driverModel.js"))
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const { adminError } = require(path.join(__dirname, "..", "utils", "customError.js"))
const addDriver = async (req, res) => {
const { 
username,
vehicle,
plateNumber,
mobile
        } = req.body;
try{


        if(!username || !vehicle || !plateNumber || !mobile){
                throw new adminError("Please Fill In All The Fields", 400)
        }
        const foundDriver = await Driver.findOne({plateNumber : plateNumber})
        const foundMobile = await Driver.findOne({mobile : mobile})
        if(foundDriver) {
            throw new adminError("Driver Already Exists", 400)
        }
        if(foundMobile){
            throw new adminError("Phone Number Has Been Used", 400)
        }
const newDriver = await Driver.create({ 
    username,
    vehicle,
    plateNumber,
    mobile
         })
         res.status(201).json({ message: "Creation of Driver Was Successful", driver: newDriver });
        }catch(error){
            console.log(error)
            if(error instanceof adminError){
                return res.status(error.statusCode).json({ error : error.message})
            }else{
                return res.status(500).json({error : "Internal Server Error"})
            }
        }
}
const deleteDriver = async (req, res) => {
    const { id } = req.params;
    try{
        const oldDriver = await Driver.findOneAndDelete({_id: id})
        if(!oldDriver){
            throw new adminError("This Driver Does Not Exist", 404)
        }
        res.status(200).json({ message: "Deletion of Driver Was Successful", driver: oldDriver });
    }catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "deleteDriverError.txt", "adminError")
         if(error instanceof adminError){
            return res.status(error.statusCode).json({ error : error.message})
        }else{
            return res.status(500).json({error : "Internal Server Error"})
        }
    }
}
const getAllDrivers = async(req, res) => {
    try{
        const drivers = await Driver.find()
        const driversCount = drivers.length
    res.status(200).json({ message : "Retrieval Of Drivers Was Successfull", drivers : drivers, count : driversCount})          
        }
        catch(error){
logEvents(`${error.name}: ${error.message}`, "getAllDriversError.txt", "adminError")
if(error instanceof adminError){
return res.status(error.statusCode).json({ message : error.message})
}else{
return res.status(500).json({message : "Internal Server Error"})
            }
        }
}
module.exports = {
    addDriver,
    deleteDriver,
    getAllDrivers
}