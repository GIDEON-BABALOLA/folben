const express = require("express")
const path = require("path")
const router = express.Router()
const {
    registerUser,
    loginUser, 
    logoutUser,
    getUser,
    getMyBookings
} = require(path.join(__dirname, "..", "controllers", "userController.js"))
const {verifyReCAPTCHA } = require(path.join(__dirname, "..", "middlewares", "verifyReCAPTCHA"))
const { authMiddleware, isUser } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
// router.post("/register-user", verifyReCAPTCHA,  registerUser);
router.post("/register-user",  registerUser);
router.post("/login-user", loginUser)
router.get("/get-user", authMiddleware, isUser, getUser)
router.get("/get-my-bookings", authMiddleware, isUser, getMyBookings)
router.get("/logout-user", logoutUser)
module.exports = router