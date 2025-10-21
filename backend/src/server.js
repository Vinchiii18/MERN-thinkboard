import express from "express"; // ES6 Modules, must add "type": "module" in package.json
// const express = require('express'); // CommonJS, must remove "type": "module" in package.json
import cors from 'cors';
// import dotenv from 'dotenv';

import notesRoutes from './routes/notesRoutes.js';
// const notesRoutes = require('./routes/notesRoutes.js');
import {connectDB} from './config/db.js';
import rateLimiter from "./middleware/rateLimiter.js";

import path from 'path';




const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();



// middleware to parse JSON request body
if (process.env.NODE_ENV !== 'production') {
    console.log("Development Mode: CORS enabled for http://localhost:5173");

    app.use(cors({
    origin: "http://localhost:5173",
    })
    );
}


app.use(express.json()); 
app.use(rateLimiter);


// custom middleware in Express to parse JSON, for testing purposes
app.use((req, res, next) => {
    console.log(`req method is ${req.method} and req URL is ${req.url}`);
    next();
})

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
})
}

connectDB().then(() => {
    app.listen(5001, () => {
        console.log("Server started on PORT:", PORT);
    });
});

