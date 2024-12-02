const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { authenticateToken } = require("./userauth");

//Sign-Up Function
router.post("/Sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;
        if (username.length < 4) {
            return res.status(400).json({ message: "Username should contain at least 4 characters" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password should contain at least 8 characters" });
        }
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
            address: address
        });
        await newUser.save();

        res.status(201).json({ success: true, message: 'User Registered Successfully, Please Login!' });
      } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Error registering user' });
      }
});

// Sign-in Function
router.post('/Sign-in', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            return res.status(200).json({ success: true, message: "Sign in Successful", ID: user._id, Role: user.role, Token: token });
        } else {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error Signing in' });
    }
});

// GET User Info
router.get("/User-Info", authenticateToken, async (req, res) => {
    try {
        const data = await User.findById(req.user._id).select('-password');
        if (!data) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

//Update Address
router.put("/update-address",authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { address } = req.body;
        await User.findByIdAndUpdate(id, {address: address });
        return res.status(200).json({ message: "Address Updated Successfully"});
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error"});
    }
});

module.exports = router;