const exporess = require("express");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

const router = exporess.Router();

//create order(calculate the cart)
router.post("/:userId", async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");
        if (!cart || cart.items.length === 0) return res.status(400).json({ error: "empty cart" });

        const totalAmount = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

        const order = new Order({
            userId: req.params.userId,
            items: cart.items,
            totalAmount,
            status: "Paid",
        });

        await order.save();
        await Cart.deleteOne({ userId: req.params.userId }); //empty the cart

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: "server error "});
    }
});

//get user order
router.get("/:userId", async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).populate("items.productId");
        res.json(orders);
    } catch(error) {
        res.status(500).json({ error: "server error" });
    }
});

module.exports = router;