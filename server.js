require('dotenv').config(); // MUST BE THE FIRST LINE
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

// Check if variables are loading (Debugging)
console.log("URI Check:", process.env.MONGO_URI); 

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback-secret-key', // Added fallback
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// MongoDB Connection with error handling
const dbURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mfa-db';
mongoose.connect(dbURI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch(err => console.error("MongoDB Connection Error:", err));

app.use('/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));