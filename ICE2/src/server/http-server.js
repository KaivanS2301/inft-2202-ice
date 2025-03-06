/**
 * Name: Kaivan Shah
 * filename: http-server.js
 * Course: INFT 2202
 * Date: 05/03/2024
 * Description: Basic HTTP server using Node.js http module
 */

import http from 'http';

const server = http.createServer((req, res) => {
    // Set default content type to HTML
    res.setHeader('Content-Type', 'text/html');

    // Get the URL and method from the request
    const { url, method } = req;

    // Basic routing based on URL and method
    if (method === 'GET') {
        if (url === '/' || url === '/index') {
            res.statusCode = 200;
            res.end('<h1>Welcome to the Home Page</h1>');
        }
        else if (url === '/about') {
            res.statusCode = 200;
            res.end('<h1>About Us</h1><p>This is a simple HTTP server.</p>');
        }
        else if (url === '/contact') {
            res.statusCode = 200;
            res.end('<h1>Contact Us</h1><p>Email: example@example.com</p>');
        }
        else {
            res.statusCode = 404;
            res.end('<h1>404 - Page Not Found</h1>');
        }
    } else {
        res.statusCode = 405;
        res.end('<h1>405 - Method Not Allowed</h1>');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});