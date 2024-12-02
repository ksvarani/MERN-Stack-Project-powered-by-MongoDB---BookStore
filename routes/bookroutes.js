const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const { authenticateToken } = require("./userauth");

// Adding Books by ADMIN
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        // Check if the user has the ADMIN role
        if (user.role !== "ADMIN") {
            return res.status(403).json({ message: "You are not authorized to perform this action!" });
        }

        // Create a new book with provided data
        const book = new Book({ 
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language,
        });

        await book.save();
        res.status(201).json({ message: "Book added successfully" });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//Update Book
router.put("/update-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language,
        });
        return res.status(200).json({ message: "Book Updated Successfully!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "!!Error Occured While Updating!!"});
    }
});

//Delete Book
router.delete("/delete-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({ message: "Book Deletion Successful"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "!!Error Occured While Deletion!!"});
    }
});

//Get All Books
router.get("/get-book", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.status(200).json({ message: "Success Retriving All Books", data: books});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error Occurred While Retriving"});
    }
});

//Get Recent Books
router.get("/get-recent-book", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4);
        return res.status(200).json({ message: "Success Retriving Recent Books", data: books});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error Occurred While Retriving"});
    }
});

//Get Book by ID
router.get("/get-book-byid/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json({ message: "Success Retriving Book", data: book});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error Occurred While Retriving"});
    }
});

module.exports = router;