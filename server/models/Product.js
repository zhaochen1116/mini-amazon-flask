const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
    rating: Number,
    description: String,
});

module.export = mongoose.model("Product", ProductSchema);