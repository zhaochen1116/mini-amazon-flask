const express = require("express");
const axios = require("axios");

const router = express.Router();

//online Flask API address
const FLASK_API_URL = "https://mini-amazon-flask.onrender.com";

router.get("/:userId", async (req, res) => {
    try {
        const response = await axios.get(`${FLASK_API_URL}/recommend/${req.params.userId}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "cannot get recommended products "});
    }
});

module.exports = router;