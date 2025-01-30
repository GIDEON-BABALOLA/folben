const express = require("express")
const path = require("path")
const router = express.Router()
const {
    registerUser,
    loginUser, 
    logoutUser,
    getMyBookings
} = require(path.join(__dirname, "..", "controllers", "userController.js"))
const {verifyReCAPTCHA } = require(path.join(__dirname, "..", "middlewares", "verifyReCAPTCHA"))
const { authMiddleware, isUser } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
router.post("/register-user", verifyReCAPTCHA,  registerUser);
router.post("/login-user", loginUser)
router.get("/get-my-bookings", authMiddleware, isUser, getMyBookings)
router.get("/logout-user",  authMiddleware, isUser, logoutUser)
module.exports = router