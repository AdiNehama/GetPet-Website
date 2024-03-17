var createError = require("http-errors");
var express = require("express");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const cors = require("cors");
// const port = 8080;
const https = require("https");
const fs = require("fs");
var connectDB = require("./db");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");
var filesRouter = require("./routes/files");

const options = {
  key:fs.readFileSync(path.join(__dirname,'./cert/privatekey.pem')),
  cert:fs.readFileSync(path.join(__dirname,'./cert/certificate.pem'))
};

const httpsApp = https.createServer(options, app);

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
  origin: 'http://localhost:3000', // Allow requests from the client's origin
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

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});



const isHttps = process.env.IS_HTTPS === "true";
const httpsPort = process.env.HTTPS_PORT;
const httpPort = process.env.HTTP_PORT;
const port = isHttps ? httpsPort : httpPort;


const server= httpsApp.listen(port, function () {
  console.log('Server is running on port ' + port);
});

const io = require("socket.io")(server, {
  // Configure CORS for socket.io
  cors: {
    origin: "http://localhost:3000", // Allow requests from the client's origin
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

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
});

module.exports = app;