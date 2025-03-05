const express = require("express");
const Cart = require("../models/cart");

const router = express.Router();

//get user cart
router.get("/:userId", async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");
        if (!cart) return res.json({ items: [] });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: "server error" })
    }
});

//add product to cart
router.post("/:userId", async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");
        if (!cart) {
            cart = new Clipboard({ userId: req.params.userId, items:[{ productId, quantity }] });
        } else {
            const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
            if (itemIndex > -1) {
                cart.itemsp[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: "server error" });
    }
});

//delete item from cart
router.delete("/:userId/:productId", async (req, res) => {
    try {
      let cart = await Cart.findOne({ userId: req.params.userId });
      if (!cart) return res.status(404).json({ error: "cart not exists" });
  
      cart.items = cart.items.filter((item) => item.productId.toString() !== req.params.productId);
      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "server error" });
    }
  });
  
  module.exports = router;