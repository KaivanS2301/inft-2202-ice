import {model, Schema} from 'mongoose';

const fields = {
    name: {
        type: String, 
        required: true
    },

    breed: {
        type: String, 
        required: true
    },

    legs: {
        type: Number, 
        required: true
    },

    eyes: {
        type: Number, 
        required: true
    },

    Sound: {
        type: String, 
        required: true
    },
}

const options = {
    timestamps: true
}

const AnimalSchema = new Schema(fields, options );
const AnimalModel = model('Animal', AnimalSchema);

export default AnimalModel;
