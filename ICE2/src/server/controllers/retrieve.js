 import AnimalService from "../services/AnimalService";

 const handle = async (req, res, next) => {
    try {
        const { animalID } = req.params;
        const animal = await AnimalService.retrieve(animalID);
        res.json(animal);
        } catch (err) {
            next(err);
            }
 }

 export default { handle }