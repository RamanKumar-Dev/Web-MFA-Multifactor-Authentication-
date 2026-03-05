const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// 1. Password Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate random 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otpCode;
    user.otpExpires = Date.now() + 300000; // 5 min expiry
    await user.save();

    // PRINT TO TERMINAL (Simulating SMS)
    console.log("--------------------------------");
    console.log(`MOBILE OTP FOR ${email}: ${otpCode}`);
    console.log("--------------------------------");

    res.json({ userId: user._id });
});

// 2. OTP Verification
router.post('/verify-otp', async (req, res) => {
    const { userId, token } = req.body;
    const user = await User.findById(userId);

    if (user && user.otp === token && user.otpExpires > Date.now()) {
        user.otp = null; // Clear OTP after use
        await user.save();
        res.json({ success: true });
    } else {
        res.status(400).json({ message: "Verification failed" });
    }
});

// Add this to your authRoutes.js if not already there
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "Account Created! Please Login." });
    } catch (err) {
        res.status(400).json({ message: "Registration failed. User may exist." });
    }
});

module.exports = router;