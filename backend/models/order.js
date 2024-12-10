const mongoose = require("mongoose");


const order = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: "user"},
    book: {type: mongoose.Types.ObjectId, ref: "books"},
    status: {type: String, default: "Order Placed", enu: ["Order Placed","Order Delivered","Order Cancelled"]}
}, { timestamps: true});

module.exports = mongoose.model("order", order);