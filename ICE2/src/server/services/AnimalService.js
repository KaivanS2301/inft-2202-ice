import Animal from '../models/Animal.js';

class AnimalService {
    constructor() {}

    async retrieveAnimal(animalID) {
        return Animal.findById(animalID);
    }

    async createAnimal({ name, breed, eyes, legs, sound }) {
        return AnimalService.create({
            name,
            breed,
            eyes,
            legs,
            sound
        });
    }

    async updateAnimal(id, updateData) {
        return Animal.findOneAndUpdate({ _id: id }, updateData, { new: true });
    }

    async deleteAnimal(id) {
        return Animal.findOneAndDelete({ _id: id });
    }
}

export default new AnimalService();