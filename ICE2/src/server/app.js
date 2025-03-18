/**
 * Name: Kaivan Shah
 * filename: app.js
 * Course: INFT 2202
 * Date: 05/03/2024
 * Description: Express server with routing
 */

import express from 'express';
import mainRouter from './routes/router.js';
import animalRouter from './routes/animals.js';
import mongoose from 'mongoose';
import { logRequest } from './middleware/logging.js';
import { errorHandler } from './middleware/errorHandler.js';

const express = require('express');
const app = express();
const path = require('path');



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logRequest); // Add logging middleware here

// Use routers
app.use('/', mainRouter);
app.use('/routes/animals', animalRouter);

// Error handling middleware
app.use(errorHandler); // Use the new error handler middleware

// 404 handler
app.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
});

// try ot connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/inft-2202-ice');
console.log('Connected to the database')

// Serve static assets from the client folder
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});