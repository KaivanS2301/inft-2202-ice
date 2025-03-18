import AnimalService from '../models/Animal.js'
import { checkSchema } from 'express-validator';

export const rules = checkSchema({
        name: {
            notEmpty: true,
            errorMessage: 'Name is required',
            in: ['body']
        },
        breed: {
            notEmpty: true,
            errorMessage: 'Breed is required',
            in: ['body']
        },
        eyes: {
            notEmpty: true,
            isNumeric: true,
            errorMessage: 'Eyes is required',
            in: ['body']
        },
        legs: {
            notEmpty: true,
            isNumeric: true,
            errorMessage: 'Legs is required',
            in: ['body']
        },
        sound: {
            notEmpty: true,
            errorMessage: 'Sound is required',
            in: ['body']
        },
    
});

const handle = async (req, res, nest) => {
    try {
        const { name, breed, eyes, legs, sound} = req.body;
        const animal = await Animal.create({ name, breed, eyes, legs, sound});
        res.json(animal);
        } catch (err) {
            next (err)
        }
}

export default { handle }