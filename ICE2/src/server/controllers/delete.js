const AnimalService = require('../../services/AnimalService');
import { checkSchema } from 'express-validator';

export const rules = checkSchema({
    id: {
        notEmpty: true,
        isMongoId: true,
        errorMessage: 'Valid ID is required',
        in: ['params']
    }
});

async function deleteAnimal(req, res) {
    try {
        const { id } = req.params;
        
        const deletedAnimal = await AnimalService.deleteAnimal(id);
        
        if (!deletedAnimal) {
            return res.status(404).json({ message: 'Animal not found' });
        }

        res.status(200).json({ message: 'Animal deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = deleteAnimal;

export default { rules };
