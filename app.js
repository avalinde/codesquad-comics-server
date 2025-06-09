//Initial Server Dependencies
require("dotenv").config();
require("./config/connection");
require("./config/authStrategy");
const express = require("express");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 8080;

//Middleware

const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

app.use(helmet());
app.use(cors({ credentials: true, origin: true }));
app.use(morgan("dev"));

//Path module

const path = require("node:path");

//Other Middleware
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routing instantiation
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const passport = require("passport");

//Session Management
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY,

    cookie: {
      httpOnly: true,
      secure: false, //turn to true when in production
      maxAge: 86400000, //24 hrs
    },
  })
);

app.use(passport.initialize());
app.use(passport.session()); //creates session on calls that require passport authentication

//routing call

app.use("/api/books", bookRoutes);
app.use("/auth", authRoutes);

app.use((error, request, result, next) => {
  const authErrStatus = error.status || 400;
  const serverErrStatus = error.status || 500;
  if (error.code === 11000) {
    return result.status(authErrStatus).json({
      error: { message: "Do you already have an account? Try logging in." },
      statuscode: authErrStatus,
    });
  }

  return result.status(serverErrStatus).json({
    error: { message: error.message || "Internal Server error." },
    statuscode: serverErrStatus,
  });
});

//routes
app.get("/", (request, response, next) => {
  //response.send("This route points to the index page")
  response.status(200).json({
    success: { message: "This route points to the index page" },
    statusCode: 200,
  });
});

//listener
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
