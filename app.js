const express = require("express");
const app = express();

const books = [
  { id: 1, title: "Book One" },
  { id: 2, title: "Book Two" },
];

app.use(express.json());

// API route
app.get("/api/books", (req, res) => {
  res.json(books);
});

// Home route
app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Book not found");
  res.json(book)
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
