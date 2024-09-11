const express = require("express");
let books = require("./booksdb.js");
let users = require("./auth_users.js").users;
const jwt = require("jsonwebtoken");
const public_users = express.Router();

// Task 1: Get the book list available in the shop
public_users.get("/", (req, res) => {
  const bookList = Object.values(books).map((book) => ({
    title: book.title,
    author: book.author,
    isbn: Object.keys(books).find((key) => books[key] === book), // assuming ISBN is the key
  }));
  res.json(bookList);
});

// Task 2: Get books based on ISBN
public_users.get("/isbn/:isbn", (req, res) => {
  const { isbn } = req.params;
  const book = books[isbn];
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Task 3: Get all books by Author
public_users.get("/author/:author", (req, res) => {
  const { author } = req.params;
  const filteredBooks = Object.values(books).filter(
    (book) => book.author === author
  );
  res.json(filteredBooks);
});

// Task 4: Get all books based on Title
public_users.get("/title/:title", (req, res) => {
  const { title } = req.params;
  const filteredBooks = Object.values(books).filter((book) =>
    book.title.includes(title)
  );
  res.json(filteredBooks);
});

// Task 5: Get book Review
public_users.get("/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const book = books[isbn];
  if (book && book.reviews) {
    res.json(book.reviews);
  } else {
    res.status(404).json({ message: "No reviews found for this book" });
  }
});

// Task 6: Register New user
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (users.find((user) => user.username === username)) {
    return res.status(409).json({ message: "Username already exists" });
  }
  users.push({ username, password });
  res.status(201).json({ message: "User registered successfully" });
});

module.exports.general = public_users;
