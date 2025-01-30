require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const app = express();
const PORT = process.env.FOLBEN_PORT
const corsOptions = require(path.join(__dirname, "config", "corsConfig.js"))
const userRouter = require(path.join(__dirname,  "routes", "userRoute.js"))
const adminRouter = require(path.join(__dirname,  "routes", "adminRoute.js"))
const bookingsRouter = require(path.join(__dirname,  "routes", "bookingsRoute.js"))
const newsletterRouter = require(path.join(__dirname,  "routes", "newsletterRoute.js"))
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })
app.use((err, req, res, next) => {
    // Handle specific error: Not allowed by CORS
    if (err.message === "Not allowed by CORS") {
      res.status(403).json({"message" : "CORS Policy Violation, Leave Now"}); // Use 403 for forbidden requests
    }
    else if(err.code === 'ECONNRESET'){
       res.status(504).json({ error: 'Your Request Has Timed out' });
    }
    else {
      // For other errors, pass to the default error handler
      next(err);
    }
  });
  
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/newsletter", newsletterRouter);
mongoose.connect(process.env.FOLBEN_MONGODB_URL)
.then(() => {
      app.listen(PORT, () => {
        console.log(` Connected To Database && Server is running on port ${PORT}`)
    })
})
.catch((error) => {
    console.log(error)
    console.log(error.name)
    console.log("Unable To Connect To Database")
})
