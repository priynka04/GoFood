const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "MyNameIsEndToEndEncrypted";

// Route to Create a New User
router.post("/createuser",
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
    async (req, res) => {
        const result = validationResult(req);

        // If validation errors exist, return them
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);

        try {
            // Create user only if validation passes
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            });

            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: "Server Error" });
        }
    }
);

// Route to Login User
router.post("/loginuser",
    async (req, res) => {
        let email = req.body.email;
        let password = req.body.password;

        try {
            let userData = await User.findOne({ email });

            if (!userData) {
                return res.status(400).json({ errors: "Invalid Email or Password" });
            }

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password); // Fixed typo here!

            if (!pwdCompare) {
                return res.status(400).json({ errors: "Invalid Email or Password" });
            }

            const data = { 
                user: {
                    id: userData.id,
                }
            };

            const authToken = jwt.sign(data, jwtSecret);
            return res.json({ success: true, authToken: authToken });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: "Server Error" });
        }
    }
);

module.exports = router;
