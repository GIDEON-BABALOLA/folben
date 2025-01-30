const express = require("express")
const path = require("path")
const router = express.Router()
const {
    registerAdmin,
    loginAdmin, 
    logoutAdmin,
    getAllDrivers
} = require(path.join(__dirname, "..", "controllers", "adminController.js"))
const {verifyReCAPTCHA } = require(path.join(__dirname, "..", "middlewares", "verifyReCAPTCHA"))
const { authMiddleware, isAdministrator } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
router.post("/register-admin", verifyReCAPTCHA,  registerAdmin);
router.post("/login-admin", loginAdmin)
router.get("/get-all-drivers", authMiddleware, isAdministrator, getAllDrivers)
router.get("/logout-admin",  authMiddleware, isAdministrator, logoutAdmin)
module.exports = router