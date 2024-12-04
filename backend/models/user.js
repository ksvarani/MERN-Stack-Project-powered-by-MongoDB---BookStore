const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: String, required: true},
    avatar: {type: String, default:"https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png"},
    role: {type: String, default: "USER", enum: ["USER","ADMIN"]},
    favourites: [{type: mongoose.Types.ObjectId, ref: "books"}],
    cart: [{type: mongoose.Types.ObjectId, ref: "books"}],
    orders: [{type: mongoose.Types.ObjectId, ref: "order"}]
},{ timestamps: true});

const User = mongoose.model('user', userSchema);//mongoose.models.User;
module.exports = User;
