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

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routerss
app.use('/', mainRouter);
app.use('/routes/animals', animalRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});