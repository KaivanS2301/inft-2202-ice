const AnimalService = require('../../services/AnimalService');

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
