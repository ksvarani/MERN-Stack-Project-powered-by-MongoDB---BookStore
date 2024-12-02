const router = require("express").Router();
const { authenticateToken } = require("./userauth");
const User = require("../models/user");
const Book = require("../models/book");
const Order = require("../models/order");

//Place Order
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;
        for ( const orderdata of order ) {
            const neworder = new Order({ user: id, book: orderdata._id });
            const orderdataFROMdb = await neworder.save();
            //Saving Order in User Model
            await User.findByIdAndUpdate(id, { $push: { orders: orderdataFROMdb._id }});
            //Clear Cart
            await User.findByIdAndUpdate(id, { $pull: { cart: orderdata._id }});
        }
        return res.json({ Status: "Success", message: "Order Placed Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error Occured while placing the Order"});
    }
});

//Get Order History
router.get("/history-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userdata = await User.findById(id).populate({ 
            path: "orders",
            populate: { path: "book" },
        });
        const ordersdata = userdata.orders.reverse();
        return res.json({ status: "Success", data: ordersdata });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error Occurred in getting History"})
    }
});

//Get All Orders - REQ by ADMIN
router.get("/get-all-order", authenticateToken, async (req, res) => {
    try {
        const userdata = await Order.find().populate({ 
            path: "book",
        }).populate({
            path: "user",
        }).sort({ createdAt: -1 });
        return res.json({ status: "Success", data: userdata });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error Occurred in getting Orders"})
    }
});

//Update Order --ADMIN Protocol
router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, { status: req.body.status });
        return res.json({ status: "Succss", message: "Order Status Updated Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error Occurred while Updating Status"});
    }
});

module.exports = router;