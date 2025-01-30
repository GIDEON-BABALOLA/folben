
const path = require("path")
const Newsletter = require(path.join(__dirname, "..", "models", "newsletterModel.js"))
const { validateEmail } = require(path.join(__dirname, "..", "utils", "validator.js"))
const { userError, validatorError } = require(path.join(__dirname, "..", "utils", "customError.js"))
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const subscribeToNewsletter = async (req, res) => {
    const { 
email
        } = req.body;
try{
    if(!email){
        throw new userError("Please Fill In All The Fields", 400)
         }
await validateEmail(email)
const foundSubscriber = await Newsletter.findOne({email : email})
if(foundSubscriber){
    throw new userError("You Have Subscribed To Our Newsletter Before", 400)
}
const date = new Date();
const newSubscriber = await Newsletter.create({ 
email,
date
 })
 res.status(201).json({ message: "Creation of Subscriber Was Successful", subscriber: newSubscriber });
}
catch(error){
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "subscribeToNewsletterError.txt", "userError")
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
const unsubscribeFromNewsletter = async (req, res) => {
    const { email } = req.body;
    try{
        if(!email){
            throw new userError("Pls Enter Your Email", 400)
        }
        await validateEmail(email)
        const oldSubscriber = await Newsletter.findOneAndDelete({email: email})
        if(!oldSubscriber){
            throw new userError("You Have Not Subscribed To Our Newsletters", 404)
        }
        res.status(200).json({ message: "Successfully Unsubscribed From Newsletter", oldSubscriber: oldSubscriber });
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "unsubscribeFromNewsletterError.txt", "userError")
         if(error instanceof userError){
            return res.status(error.statusCode).json({ error : error.message})
        }
        else if(error instanceof validatorError){
            return  res.status(error.statusCode).json({ message : error.message})  
        }
        else{
            return res.status(500).json({error : "Internal Server Error"})
        }
    }
    }
module.exports = { 
subscribeToNewsletter,
unsubscribeFromNewsletter
}