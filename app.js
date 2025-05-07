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

//routes
app.get("/", (request, response, next) => {
    //response.send("This route points to the index page")
    response.status(200).json({
        success: { message: "This route points to the index page"},
        statusCode: 200,
    });
});

app.get("/api/books", (request, response, next) => {
    //response.send("This route will send all of the book data")
    response.status(200).json({
        success: { message: "This route will send all of the book data"},
        statusCode: 200,
    });
});

app.get("/api/books/:id", (request, response, next) => {
    //response.send("This route will send a single book by its id")
    response.status(200).json({
        success: { message: "This route will send a single book by its id"},
        statusCode: 200,
    });
});

app.get("/api/books/create/new", (request, response, next) => {
    //response.send("This route will create a new book")
    response.status(200).json({
        success: { message: "This route will create a new book"},
        statusCode: 200,
    });
});

app.get("/api/books/update/:id", (request, response, next) => {
    //response.send("This route will update a book by its id")
    response.status(200).json({
        success: { message: "This route will update a book by its id"},
        statusCode: 200,
    });
});

app.get("/api/books/delete/:id", (request, response, next) => {
    //response.send("This route will delete a book by its id")
    response.status(200).json({
        success: { message: "This route will delete a book by its id"},
        statusCode: 200,
    });
});

//listener
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });