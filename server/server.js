const express = require("express");
const axios = require("axios");
const router = express.Router();
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config({ path: './.env' }); // 强制加载 .env
// console.log("MongoDB URL (from .env):", process.env.MONGO_URL);

const app = express();
app.use(express.json());
app.use(cors());


const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

const recommendRoutes = require("./routes/recommendRoutes");
app.use("/api/recommend", recommendRoutes);

// connect to database
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error("❌ MongoDB Connection Error: ", err));

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//get recommended product from ml
router.get("/:userId", async (req, res) => {
    try {
        const response = await axios.get(`http://127.0.0.1:5001/recommend/${req.params.userId}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "cannot get recommended products "});
    }
});

module.exports = router;

