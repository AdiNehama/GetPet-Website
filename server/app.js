var createError = require("http-errors");
var express = require("express");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const cors = require("cors");
var debug = require('debug')('get-pet:server');


const port = 8080;
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');

const cors = require('cors');
// const MongoDBStore = require("connect-mongodb-session")(session);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");

var connectDB = require("./db");


connectDB();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");


//upload file
const storage = multer.diskStorage ({
  destination : function (req, file, cb) {
  cb(null, 'public/')
  },
  filename: function (req, file, cb) {
  const ext = file.originalname .split('.')
  . filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
  . slice(1)
  . join('.')
  cb(null, Date.now() + "." + ext)
  }
 })
 const upload = multer({ storage: storage });

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3001', // Allow requests from the client's origin
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  credentials: true // Include cookies in CORS requests
}));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(8080, function () {
  console.log('Server is running on port 8080');
});

module.exports = app;
