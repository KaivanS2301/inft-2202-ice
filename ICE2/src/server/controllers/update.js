const AnimalService = require('../../services/AnimalService');
import { checkSchema } from 'express-validator';

export const rules = checkSchema({
    id: {
        notEmpty: true,
        isMongoId: true,
        errorMessage: 'Valid ID is required',
        in: ['params']
    },
    name: {
        optional: true,
        isString: true,
        errorMessage: 'Name must be a string',
        in: ['body']
    },
    breed: {
        optional: true,
        isString: true,
        errorMessage: 'Breed must be a string',
        in: ['body']
    },
    eyes: {
        optional: true,
        isNumeric: true,
        errorMessage: 'Eyes must be a number',
        in: ['body']
    },
    legs: {
        optional: true,
        isNumeric: true,
        errorMessage: 'Legs must be a number',
        in: ['body']
    },
    sound: {
        optional: true,
        isString: true,
        errorMessage: 'Sound must be a string',
        in: ['body']
    }
});

async function update(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedAnimal = await AnimalService.updateAnimal(id, updateData);

        if (!updatedAnimal) {
            return res.status(404).json({ message: 'Animal not found' });
        }

        res.status(200).json(updatedAnimal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = update;
export default { rules };
