//const booksData = require("../data/books");

const Book = require("../models/bookModel");

const getAllBooks = async (request, response, next) => {
  try {
    const books = await Book.find({});

    response.status(200).json({
      success: { message: "This route sends all of the book data" },
      data: { books },
      statusCode: 200,
    });
  } catch (error) {
    return next(error);
  }
};

const getBook = async (request, response, next) => {
  const { _id } = request.params;

  try {
    //const book = booksData.find((book) => book._id === _id);

    if (!_id) {
      throw new Error("Id is required");
    }
    const book = await Book.findById(_id);

    if (!book) {
      throw new Error("No book found by given ID");
    }

    response.status(200).json({
      success: { message: "This route sends a single book by its id" },
      data: { book },
      statusCode: 200,
    });
  } catch (error) {
    return next(error);
  }
};

const createBook = async (request, response, next) => {
  const { title, author, publisher, genre, pages, rating, synopsis, imageURL } =
    request.body;

  try {
    // books.push(newBook);
    if (!title || !author || !pages) {
      throw new Error("Missing required fields, please review.");
    }

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

    await newBook.save;

    response.status(201).json({
      success: { message: "This route created a new book" },
      data: newBook,
      statusCode: 201,
    });
  } catch (error) {
    return next(error);
  }
};

const updateBook = async (request, response, next) => {
  const { _id } = request.params;
  const { title, author, publisher, genre, pages, rating, synopsis, imageUrl } =
    request.body;

  try {
    if (!title || !author || !pages) {
      throw new Error("Missing required fields, please review.");
    }

    const updatedBook = await Book.findByIdAndUpdate(
      _id,
      {
        $set: {
          title,
          author,
          publisher,
          genre,
          pages,
          rating,
          synopsis,
          imageUrl,
        },
      },
      { new: true }
    );

    if (!updatedBook) {
      throw new Error("Book not found");
    }
    //const foundBookIndex = books.find((book) => book._id === _id);
    //books[foundBookIndex] = newBook;

    response.status(201).json({
      success: { message: "This route updated a book by its id" },
      data: { updatedBook },
      statusCode: 201,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteBook = async (request, response, next) => {
  const { _id } = request.params;

  try {
    //const eraser = books.filter((book) => book._id !== _id);
    //console.log(eraser);

    if (!_id) {
      throw new Error("ID is required");
    }

    await Book.findByIdAndDelete(_id);

    response.status(200).json({
      success: { message: "This route deleted a book by its id" },
      statusCode: 200,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getAllBooks, getBook, createBook, updateBook, deleteBook };
