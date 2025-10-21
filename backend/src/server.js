import express from "express"; // ES6 Modules, must add "type": "module" in package.json
// const express = require('express'); // CommonJS, must remove "type": "module" in package.json
import cors from 'cors';
// import dotenv from 'dotenv';

import notesRoutes from './routes/notesRoutes.js';
// const notesRoutes = require('./routes/notesRoutes.js');
import {connectDB} from './config/db.js';
import rateLimiter from "./middleware/rateLimiter.js";




const app = express();
const PORT = process.env.PORT || 5001;



// middleware to parse JSON request body

app.use(cors({
    origin: "http://localhost:5173",
    })
);

app.use(express.json()); 
app.use(rateLimiter);


// custom middleware in Express to parse JSON, for testing purposes
app.use((req, res, next) => {
    console.log(`req method is ${req.method} and req URL is ${req.url}`);
    next();
})

app.use("/api/notes", notesRoutes)

connectDB().then(() => {
    app.listen(5001, () => {
        console.log("Server started on PORT:", PORT);
    });
});

