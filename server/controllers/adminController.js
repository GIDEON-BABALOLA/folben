const path = require("path")
const bcrypt = require("bcrypt")
const Admin = require(path.join(__dirname, "..", "models", "adminModel.js"))
const _ = require("lodash")
const { validateEmail, validatePassword, isAdminEmail } = require(path.join(__dirname, "..", "utils", "validator.js"))
const { generateAccessToken, generateRefreshToken} = require(path.join(__dirname, "..", "config", "tokenConfig.js"))
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const { adminError, validatorError } = require(path.join(__dirname, "..", "utils", "customError.js"))
const registerAdmin = async(req, res) => {
try{
const { 
username,
mobile,
email,
password,
} = req.body;
if(  !username || !mobile || !email || !password){
        throw new adminError("Please Fill In All The Fields", 400)
}
const isAdmin = isAdminEmail(email)
if(!isAdmin){
    throw new adminError("You are not an administrator for folben", 400)
}
await validateEmail(email)
await validatePassword(password)
const foundAdmin = await Admin.findOne({email : email})
const foundMobile = await Admin.findOne({mobile : mobile})
if(foundAdmin) {
    throw new adminError("Admin Already Exists", 400)
}
if(foundMobile){
    throw new adminError("Phone Number Has Been Used", 400)
}
const hashedPassword = await bcrypt.hash(password, 10);
const newAdmin = await Admin.create({ 
    username,
    mobile,
    email,
    password  : hashedPassword,
 })
 res.status(201).json({ message: "Creation of Admin Was Successful", admin: newAdmin });
}catch(error){
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "registerAdminError.txt", "adminError")
    if (error instanceof adminError) {
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
const loginAdmin = async(req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            throw new adminError("Please Provide An Email And A Password", 400)
        }
        await validateEmail(email)
        await validatePassword(password)
        const foundAdmin = await Admin.findOne({email : email})
        if(!foundAdmin){
            throw new adminError("Your Administrator Account Does Not Exist", 404)
        }
        const match = await bcrypt.compare(password, foundAdmin.password)
        if(foundAdmin && match){
            const id = foundAdmin?._id.toString()
            const refreshToken = generateRefreshToken(id, foundAdmin.role)
            await Admin.findByIdAndUpdate(id, {refreshToken : refreshToken}, { new : true})
            res.cookie("refreshToken", refreshToken, { httpOnly : true, maxAge: 60 * 60 * 1000 * 24 * 7, sameSite : "None",  secure : true })
            //Seven Day Refresh Token
        const detailsOfAdminToBeSent = _.omit(foundAdmin.toObject(), "refreshToken")
        res.status(201).json({...detailsOfAdminToBeSent, accessToken : generateAccessToken(id, foundAdmin.role)
        })
         }
        else{
            throw new adminError("Invalid Credentials", 401)
        }
        }catch(error){
            console.log(error)
            logEvents(`${error.name}: ${error.message}`, "loginAdminError.txt", "adminError")
            if (error instanceof adminError) {
               return  res.status(error.statusCode).json({ message : error.message})
            }else if(error instanceof validatorError){
                return  res.status(error.statusCode).json({ message : error.message})  
            }
            else{
                return res.status(500).json({message : "Internal Server Error"})
                }
        }
}
const getAdmin = async (req, res) => {
    const { _id } = req.user
    try{
        const admin = await Admin.findById({_id : _id})
        if(!admin){
            throw new adminError("You Are Not Logged In", 401)
        }
        const detailsOfAdminToBeSent = _.omit(admin.toObject(), "refreshToken", "password"
        )
            res.status(200).json(detailsOfAdminToBeSent)
    }
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "getAdminError.txt", "adminError")
        if (error instanceof adminError) {
           return  res.status(error.statusCode).json({ message : error.message})
        }else if(error instanceof validatorError){
            return  res.status(error.statusCode).json({ message : error.message})  
        }
        else{
            return res.status(500).json({message : "Internal Server Error"})
            } 
    }
}
const logoutAdmin = async(req, res) => {
    const cookies = req.cookies
    try{
        if(!cookies?.refreshToken){
            throw new adminError("You Are Not Logged In", 401)
        }
        const refreshToken = cookies.refreshToken;
        const admin = await Admin.findOne({refreshToken : refreshToken})
        if(!admin){
            res.clearCookie("refreshToken", {httpOnly: true, sameSite : "None" , secure  : true })
            return res.status(200).json({message : "Successfully Logged Out", "success" : true})
        }
        admin.refreshToken = ""
        await admin.save();      
        res.clearCookie("refreshToken", {httpOnly: true,  sameSite : "None", secure : true })
        return res.status(200).json({message : "Successfully Logged Out now", "success" : true})
    }catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "logoutadminError.txt", "adminError")
        if (error instanceof adminError) {
            return res.status(error.statusCode).json({ error : error.message})
        }
        else{
            return res.status(500).json({error : "Internal Server Error"})
            }
    }
}
module.exports = {
    registerAdmin,
    loginAdmin, 
    getAdmin,
    logoutAdmin,
}