const validator = require("validator")
const passwordValidator = require("password-validator");
const { validatorError } = require("./customError");
const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(",") || [];
const schema = new passwordValidator();
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 2 digits
const validatePassword = async (password) => {
const isValid = schema.validate(password)
if(!isValid){
    throw new validatorError("Password must contain minimum of 8 character, a lowercase and uppercase alphabet, no spaces and a minimum of 1 digits", 
        400
    )
}
}
const validateEmail = async (email) => {
    const isValid = validator.isEmail(email);
    if(!isValid){
throw new validatorError("Invalid Email", 400)
    }
}
function isAdminEmail(email) {
    return ADMIN_EMAILS.includes(email);
}

const validateURL = async (url) => {
  try{
    const encodedUrl = encodeURI(url);
new URL(encodedUrl)
return true
  }catch(error){
    console.log(error)
return false
  }
}
module.exports = { validatePassword, validateEmail, validateURL, isAdminEmail}