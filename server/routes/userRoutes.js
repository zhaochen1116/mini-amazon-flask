const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/User");
const User = require("../models/User");

const router = express.Router();

//user register
router.post("/register", async(req, res) => {
    const { name, emai, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "Register successful" });
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
});

//login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "user not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) return res.status(400).json({ message: "wrong password" });

        const token = jwt.sign({ id: user_id }, "secret", { expiresIn: "1h" });

        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: "sever error "});
    }
});

module.exports = router;