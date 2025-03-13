/**
 * Name: Kaivan Shah
 * filename: router.js
 * Course: INFT 2202
 * Date: 05/03/2024
 * Description: Main router for basic pages
 */

import express from 'express';
const router = express.Router();
const searchController = require('../controllers/search');

// Index route
router.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to the Home Page</h1>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    `);
});

// About route
router.get('/about', (req, res) => {
    res.send(`
        <h1>About Us</h1>
        <p>This is a simple Express server created for ICE12.</p>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    `);
});

// Contact route
router.get('/contact', (req, res) => {
    res.send(`
        <h1>Contact Us</h1>
        <p>Email: example@example.com</p>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    `);
});

// Search route
router.get('/search', searchController.handle);

export default router;