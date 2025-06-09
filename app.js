//Initial Server Dependencies
require("dotenv").config();
require("./config/connection");
//require("./config/authStrategy");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

//Middleware

const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

app.use(helmet());
app.use(cors());
app.use(morgan("combined"));

//Path module

const path = require("node:path");

//Other Middleware
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routing instantiation
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");

//routes
app.get("/", (request, response, next) => {
  //response.send("This route points to the index page")
  response.status(200).json({
    success: { message: "This route points to the index page" },
    statusCode: 200,
  });
});

//routing call

app.use("/api/books", bookRoutes);
app.use("/auth", authRoutes);

//listener
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
