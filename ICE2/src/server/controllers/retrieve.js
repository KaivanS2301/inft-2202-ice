 import AnimalService from "../services/AnimalService";
 import { checkSchema } from 'express-validator';

export const rules = checkSchema({
    id: {
        notEmpty: true,
        isMongoId: true,
        errorMessage: 'Valid ID is required',
        in: ['params']
    }
});

 const handle = async (req, res, next) => {
    try {
        const { animalID } = req.params;
        const animal = await AnimalService.retrieve(animalID);
        res.json(animal);
        } catch (err) {
            next(err);
            }
 }

 export default { rules };