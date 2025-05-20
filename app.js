//Initial Server Dependencies
const express = require("express");
const app = express();
const PORT = 8080;

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

//routes
app.get("/", (request, response, next) => {
    //response.send("This route points to the index page")
    response.status(200).json({
        success: { message: "This route points to the index page"},
        statusCode: 200,
    });
});



//routing call

app.use("/api/books", bookRoutes);


//listener
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });