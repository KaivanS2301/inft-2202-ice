/**
 * Name: Kaivan Shah
 * filename: animals.js
 * Course: INFT 2202
 * Date: 05/03/2024
 * Description: Animal routes for CRUD operations
 */

import express from 'express';
import Animal from '../models/Animal.js';

const animalRouter = express.Router();

// List animals (GET /api/animals)
animalRouter.get('/', async (req, res, next) => {
    try {
        const { page = 1, perPage = 5, owner } = req.query;
        const filter = owner ? { owner } : {}; 

        const animals = await Animal.find(filter)
            .limit(parseInt(perPage))
            .skip((parseInt(page) - 1) * parseInt(perPage));

        res.json(animals);
    } catch (err) {
        next(err);
    }
});

// Get single animal (GET /api/animals/:id)
animalRouter.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const animal = await Animal.findById(id);
        
        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }

        res.json(animal);
    } catch (err) {
        next(err);
    }
});

// Create animal (POST /api/animals)
animalRouter.post('/', async (req, res, next) => {
    try {
        const { name, breed, eyes, legs, sound } = req.body;
        const animal = await Animal.create({ name, breed, eyes, legs, sound });
        res.status(201).json(animal);
    } catch (err) {
        next(err);
    }
});

// Update animal (PUT /api/animals/:id)
animalRouter.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedAnimal = await Animal.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedAnimal) {
            return res.status(404).json({ message: 'Animal not found' });
        }

        res.json(updatedAnimal);
    } catch (err) {
        next(err);
    }
});

// Delete animal (DELETE /api/animals/:id)
animalRouter.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedAnimal = await Animal.findByIdAndDelete(id);

        if (!deletedAnimal) {
            return res.status(404).json({ message: 'Animal not found' });
        }

        res.json({ message: 'Animal deleted successfully' });
    } catch (err) {
        next(err);
    }
});

// Search animals (GET /api/animals/search)
animalRouter.get('/search', async (req, res, next) => {
    try {
        const { query } = req.query;
        const results = await Animal.find({ name: { $regex: query, $options: 'i' } });
        res.json(results);
    } catch (err) {
        next(err);
    }
});

export default animalRouter;
