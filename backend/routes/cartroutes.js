const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userauth");

//Add to Cart
router.put("/add-book-cart", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userdata = await User.findById(id);
        const isBookCarted = userdata.cart.includes(bookid);
        if (isBookCarted) {
            return res.status(200).json({ message: "Book has already added to Cart"});
        }
        await User.findByIdAndUpdate(id,{$push: { cart: bookid } });
        return res.status(200).json({ message: "Book added to Cart"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error"});
    }
});

//Remove Book from Cart
router.put("/remove-book-cart/:bookid", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { bookid } = req.params;
        await User.findByIdAndUpdate(id,{$pull: { cart: bookid } });
        return res.status(200).json({ message: "Book Successfully removed from Cart"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error"});
    }
});

//Get Cart of a USER
router.get("/get-book-cart", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userdata = await User.findById(id).populate("cart");
        const cartbooks = userdata.cart;
        return res.json({ status: "Success", data: cartbooks});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error Occurred while fetching Cart"});
    }
});

module.exports = router;