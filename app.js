require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const session = require("express-session");
var path = require("path");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
require("./models/database").connectDataBase();

//cors 
// const cors =require("cors");
app.use(require("cors")({credentials:true,origin:true}))

const ErrorHandler = require("./utils/errorHandler");
const { generatedErrors } = require("./middlewares/error");

//logger
const logger = require("morgan");
app.use(logger("tiny"));

//bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//session
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRETE,
  })
);
app.use(cookieParser());
//express file upload
const fileUpload = require("express-fileupload");
app.use(fileUpload())

//routes
app.use("/", require("./routes/indexRouter"));
app.use("/resume", require("./routes/resumeRouter"));
app.use("/employe", require("./routes/employeRouter.js"));

// error handling
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`requested url nor found ${req.url},404`));
});

app.use(generatedErrors);
app.listen(
  process.env.PORT,
  console.log(`server running on port ${process.env.PORT}`)
);
