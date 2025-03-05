const exporess = require("express");
const Product = require("../models/Product");

const router = exporess.Router();

//get all the products
router.get("/", async(req, res) => {
    const products = await Product.find();
    res.json(products);
});

//add product
router.post("/", async(req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
});

//search by keyword
router.get("/search", async (req, res) => {
    const { query, category } = req.query;
    let filter = {};

    if (query) {
        filter.name = { $regex: query, $options: "i" };
    }

    if (category) {
        filter.category = category;
    }

    const products = await Product.find(filter);
    res.json(products);
});

module.exports = router;