var createError = require("http-errors");
var express = require("express");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const cors = require("cors");
var { expressjwt: jwt } = require("express-jwt");

//port
const port = 8080;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");
var filesRouter = require("./routes/files");

var connectDB = require("./db");

connectDB();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

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
//routing
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/files", filesRouter);
app.use('/images', express.static('uploads'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



// app.get(
//   "/protected",
//   jwt({ secret: "422894887443-746rnu7vd6ldo6kkpjmorm0tebh1rt23.apps.googleusercontent.com", algorithms: ["HS256"] }),
//   function (req, res) {
//     if (!req.auth.admin) return res.sendStatus(401);
//     res.sendStatus(200);
//   }
// );
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
//port 8080
app.listen(8080, function () {
  console.log('Server is running on port 8080');
});

module.exports = app;
