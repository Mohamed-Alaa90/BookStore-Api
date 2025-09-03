const express = require("express");
const router = express.Router();
const Joi = require("joi");

let books = [
    { id: 1, title: "Book One", price: 500 },
    { id: 2, title: "Book Two", price: 200 }
];

/**
 * @desc Get all books
 * @route /api/books
 * @method GET
 * @access Public
 */
router.get("/", (req, res) => {
    res.json(books);
});

/**
 * @desc GET book by ID
 * @route /api/books/:id
 * @method GET
 * @access Public
 */
router.get("/:id", (req, res) => {
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).send("Book not found");
    }
});

/**
 * @desc Post a new bool
 * @route /api/books
 * @method POST
 * @access Public
 */
router.post("/", (req, res) => {
    // : validation
    const { error } = validateCreateBook(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        price: req.body.price
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

/**
 * @desc Update book by ID
 * @route /api/books/:id
 * @method PUT
 * @access Public
 */
router.put("/:id", (req, res) => {
    const { error } = validateUpdateBook(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if (book) {
        res.status(200).json({ message: "Book Updated" });
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

/**
 * @desc Delete book by ID
 * @route /api/books/:id
 * @method DELETE
 * @access Public
 */
router.delete("/:id", (req, res) => {
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if (book) {
        res.status(200).json({ message: "Book deleted" });
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

function validateCreateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(200).required(),
        price: Joi.number().min(0).required()
    });
    return schema.validate(obj);
}

function validateUpdateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(200),
        price: Joi.number().min(0).required()
    });

    return schema.validate(obj);
}
module.exports = router;
