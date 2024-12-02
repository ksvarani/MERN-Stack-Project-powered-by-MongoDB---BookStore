const JWT = require("jsonwebtoken");

//Token Authentication
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.status(401).json({ message: "ACCESS CARD REQUIRED" });
    }
    //Token Verification
    JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "TIME OUT!, SIGN IN AGAIN" });
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
