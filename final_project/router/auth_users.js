const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const { authenticateToken } = require("../MiddleWare/authenticateToken.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  return users.some((user) => user.username === username);
};

const authenticatedUser = (username, password) => {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  return user != null;
};

regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(users);
  if (authenticatedUser(username, password)) {
    const accessToken = jwt.sign({ username }, "IBMBackendCourse", {
      expiresIn: "1h",
    });
    return res.json({ accessToken });
  } else {
    return res
      .status(401)
      .json({ message: "Username or password is incorrect" });
  }
});

regd_users.put("/auth/review/:isbn", authenticateToken, (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;
  const book = books[isbn];
  if (book) {
    book.reviews[req.user.username] = review;
    return res.json({ message: "Review added", book });
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

regd_users.delete("/auth/review/:isbn", authenticateToken, (req, res) => {
  const { isbn } = req.params;
  const book = books[isbn];
  if (book) {
    delete book.reviews[req.user.username];
    return res.json({ message: "Review deleted", book });
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
