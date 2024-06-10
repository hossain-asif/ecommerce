const express = require('express');
const app = new express();
const router = require('./src/routes/api');

const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');


const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require('mongoose');
// const xss = require('xss'); 



// middlewares
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(cookieParser());
app.use(mongoSanitize());
// app.use(xss());

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

let limiter = rateLimit({windowMs:15*60*1000,max:3000});
app.use(limiter);

// MongoDB connection
let URI = "mongodb://localhost:27017/ecommerce"
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });


// Web cache validation and conditional requests in Http
app.set('etag', false); 

// API routes
app.use("/api/v1", router);

// Serve static assets for React front end
app.use(express.static('client/dist'));

// Serve React front end for all routes not handled by the API
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});


module.exports = app;