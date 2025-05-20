const booksData = require("../data/books");

const getAllBooks = async (request, response, next) => {
  try {
    const books = booksData;

    response.status(200).json({
      success: { message: "This route sends all of the book data" },
      data: books,
      statusCode: 200,
    });
  } catch (error) {
    response.status(400).json({
      error: {
        message:
          "There was an error when retrieving the books. Please try again later.",
      },
    });
  }
};

const getBook = async (request, response, next) => {
  const { _id } = request.params;

  try {
    const book = booksData.find((book) => book._id === _id);
    response.status(200).json({
      success: { message: "This route sends a single book by its id" },
      data: book,
      statusCode: 200,
    });
  } catch (error) {
    response.status(400).json({
      error: {
        message:
          "There was an error when retrieving the book. Please try again later.",
      },
    });
  }
};

const createBook = async (request, response, next) => {
  const { title, author, publisher, genre, pages, rating, synopsis, imageURL } =
    request.body;

  const newBook = {
    title,
    author,
    publisher,
    genre,
    pages,
    rating,
    synopsis,
    imageURL,
  };
  try {
    books.push(newBook);
    response.status(201).json({
      success: { message: "This route created a new book" },
      data: newBook,
      statusCode: 201,
    });
  } catch (error) {
    return response.status(400).json({
      error: { message: "There is an error when creating a book" },
    });
  }
};

const updateBook = async (request, response, next) => {
  const { _id } = request.params;
  const { title, author, publisher, pages, rating, synopsis, imageURL } =
    request.body;

  try {
    const updatedBook = {
      title,
      author,
      publisher,
      genre,
      pages,
      rating,
      synopsis,
      imageURL,
    };
    const foundBookIndex = books.find((book) => book._id === _id);
    books[foundBookIndex] = newBook;

    response.status(201).json({
      success: { message: "This route updated a book by its id" },
      data: { updatedBook },
      statusCode: 201,
    });
  } catch (error) {
    return response.status(400).json({
      error: { message: "There is an error when updating a book" },
    });
  }
};

const deleteBook = (request, response, next) => {
  const { _id } = request.params;

  try {
    const eraser = books.filter((book) => book._id !== _id);
    console.log(eraser);

    response.status(200).json({
      success: { message: "This route deleted a book by its id" },
      statusCode: 200,
    });
  } catch (error) {
    return response.status(400).json({
      error: { message: "There is an error when deleting a book" },
    });
  }
};

module.exports = { getAllBooks, getBook, createBook, updateBook, deleteBook };
