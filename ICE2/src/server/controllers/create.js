import AnimalService from '../models/Animal.js'

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