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
// const MongoDBStore = require("connect-mongodb-session")(session);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");

var connectDB = require("./db");


connectDB();

// //Create a session for the user
// const store = new MongoDBStore({
//   uri: process.env.MONGO_URI,
//   collection: 'sessions',
//   mongooseConnection: mongoose.connection
// });

// // Multer Configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/')
//   },
//   filename: function (req, file, cb) {
//     const ext = file.originalname.split('.').filter(Boolean).slice(1).join('.');
//     cb(null, Date.now() + '.' + ext);
//   }
// });
// var upload = multer({ storage: storage });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");


app.use(logger("dev"));
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
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const server = app.listen(port, () => console.log(`Server running on port ${port}.`));

const io = require("socket.io")(server, {
  // Configure CORS for socket.io
  cors: {
    origin: "http://localhost:3001", // Allow requests from the client's origin
    methods: ["GET", "POST"], // Allow specified methods
    allowedHeaders: ["my-custom-header"], // Allow specified headers
    credentials: true // Include cookies in CORS requests
  }
});


io.on("connection", async (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});


module.exports = app;
