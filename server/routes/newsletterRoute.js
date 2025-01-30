const express = require("express")
const path = require("path")
const router = express.Router()
const {
    subscribeToNewsletter,
    unsubscribeFromNewsletter
} = require(path.join(__dirname, "..", "controllers", "newsletterController.js"))
router.post("/subscribe-to-newsletter",  subscribeToNewsletter);
router.get("/unsubscribe-to-newsletter", unsubscribeFromNewsletter)
module.exports = router