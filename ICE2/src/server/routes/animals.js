/**
 * Name: Kaivan Shah
 * filename: animals.js
 * Course: INFT 2202
 * Date: 05/03/2024
 * Description: Animal routes for CRUD operations
 */

import express from 'express';
const animalRouter = express.Router();

// List animals (GET /api/animals)
animalRouter.get('/', (req, res) => {
    const { page = 1, perPage = 5, owner } = req.query;
    res.json({
        message: 'List animals',
        params: { page, perPage, owner }
    });
});

// Get single animal (GET /api/animals/:id)
animalRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        message: 'Get single animal',
        id: id
    });
});

// Create animal (POST /api/animals)
animalRouter.post('/', (req, res) => {
    const animalData = req.body;
    res.json({
        message: 'Create animal',
        data: animalData
    });
});

// Update animal (PUT /api/animals/:id)
animalRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    res.json({
        message: 'Update animal',
        id: id,
        data: updateData
    });
});

// Delete animal (DELETE /api/animals/:id)
animalRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        message: 'Delete animal',
        id: id
    });
});

// Search animals (GET /api/animals/search)
animalRouter.get('/search', (req, res) => {
    const { query } = req.query;
    res.json({
        message: 'Search animals',
        query: query
    });
});

export default animalRouter;