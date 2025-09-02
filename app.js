const express = require("express");
const app = express();

let books = [
    { id: 1, title: "Book One" },
    { id: 2, title: "Book Two" }
];

app.use(express.json());

// GET all books
app.get("/api/books", (req, res) => {
    res.json(books);
});

// GET book by ID
app.get("/api/books/:id", (req, res) => {
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).send("Book not found");
    }
});

// POST new book
app.post("/api/books", (req, res) => {
    // : validation
    if (!req.body.title) {
        return res.status(400).json({ error: "Title is required" });
    }
    const newBook = {
        id: books.length + 1,
        title: req.body.title
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// Start server
const PORT = process.env.PORT || 5000; // : environment variable

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
