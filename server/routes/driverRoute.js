const express = require("express")
const path = require("path")
const router = express.Router()
const {
    getAllDrivers, 
    addDriver,
    deleteDriver
} = require(path.join(__dirname, "..", "controllers", "driverController.js"))
const { authMiddleware, isAdministrator} = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
router.post("/add-driver", authMiddleware, isAdministrator, addDriver);
router.get("/get-all-drivers", authMiddleware,  isAdministrator, getAllDrivers)
router.delete("/delete-driver", authMiddleware, isAdministrator, deleteDriver);
module.exports = router