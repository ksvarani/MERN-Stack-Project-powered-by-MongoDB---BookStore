const express = require("express");
const cors = require('cors');
const app = express();
app.use(express.json());
const dotenv = require('dotenv');
const mongoose = require("mongoose");
dotenv.config();
const User = require("./routes/userroutes");
const Books = require("./routes/bookroutes");
const Favourite = require("./routes/favouriteroutes");
const Cart = require("./routes/cartroutes");
const Order = require("./routes/orderroutes");

app.use(cors({ origin: "http://localhost:5173" }));
//Routes
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

//creating port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Database connection error:', err));
