const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userauth");

//Add Book to Favourite
router.put("/add-book-favourite", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userdata = await User.findById(id);
        const isBookFavourite = userdata.favourites.includes(bookid);
        if (isBookFavourite) {
            return res.status(200).json({ message: "Book is already in Favourites"});
        }
        await User.findByIdAndUpdate(id,{$push: { favourites: bookid } });
        return res.status(200).json({ message: "Book added to Favourites"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error"});
    }
});

//Remove Book from Favourites
router.put("/remove-book-favourite", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userdata = await User.findById(id);
        const isBookFavourite = userdata.favourites.includes(bookid);
        if (isBookFavourite) {
            await User.findByIdAndUpdate(id,{$pull: { favourites: bookid } });
        }
        return res.status(200).json({ message: "Book removed from Favourites"});
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error"});
    }
});

//Get Favorite Books of a USER
router.get("/get-book-favourite", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userdata = await User.findById(id).populate("favourites");
        const favouritebooks = userdata.favourites;
        return res.json({ status: "Success", data: favouritebooks});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error Occurred while fetching favourites"});
    }
});

module.exports = router;