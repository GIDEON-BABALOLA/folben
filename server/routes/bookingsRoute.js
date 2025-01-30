const express = require("express")
const path = require("path")
const router = express.Router()
const {
    bookARide, 
    getAllBookings
} = require(path.join(__dirname, "..", "controllers", "bookingsController.js"))
const { authMiddleware, isAdministrator, isUser} = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
router.post("/book-a-ride", authMiddleware, isUser,  bookARide);
router.get("/get-all-bookings", authMiddleware,  isAdministrator, getAllBookings)
module.exports = router