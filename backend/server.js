require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require("./routes/blogRoutes");

const app = express();

// Middle ware
app.use(express.json());
app.use((req, res, next) => {
    console.log(`PATH: ${req.path} | METHOD: ${req.method}`);
    next();
})

// Database connection using mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, (req, res) => {
            console.log("Connected to PORT: 4000");
        })
    })
    .catch(err => console.log(err));


