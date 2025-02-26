/**
 * Name: Kaivan Shah
 * File name: animal.mock.service.js
 * Course: INFT 2202-07 Web Development - CSS  
 * Date: 2025-02-25
 * Description: This JavaScript file provides mock service for animal CRUD operations.
 */

import Animal from './Animal.js';

function AnimalService() {
    if (!localStorage.getItem('animals')) {
        localStorage.setItem('animals', JSON.stringify([]));
    }
}

AnimalService.prototype.listAnimals = function() {
    const animals = JSON.parse(localStorage.getItem('animals'));
    return animals.map(animal => new Animal(animal));
};

AnimalService.prototype.findAnimal = function(id) {
    const animals = JSON.parse(localStorage.getItem('animals'));
    const animal = animals.find(a => a.id === id);
    if (!animal) {
        throw new Error('That animal doesn\'t exist!');
    }
    return new Animal(animal);
};

AnimalService.prototype.createAnimal = function(animal) {
    const animals = JSON.parse(localStorage.getItem('animals'));
    const exists = animals.some(a => a.name.toLowerCase() === animal.name.toLowerCase());
    
    if (exists) {
        throw new Error('That animal already exists!');
    }
    
    animals.push(animal.toJSON());
    localStorage.setItem('animals', JSON.stringify(animals));
    return true;
};

AnimalService.prototype.updateAnimal = function(animal) {
    const animals = JSON.parse(localStorage.getItem('animals'));
    const index = animals.findIndex(a => a.id === animal.id);
    
    if (index === -1) {
        throw new Error('That animal doesn\'t exist!');
    }
    
    animals[index] = animal.toJSON();
    localStorage.setItem('animals', JSON.stringify(animals));
    return true;
};

AnimalService.prototype.deleteAnimal = function(animal) {
    const animals = JSON.parse(localStorage.getItem('animals'));
    const filteredAnimals = animals.filter(a => a.id !== animal.id);
    
    if (filteredAnimals.length === animals.length) {
        throw new Error('That animal doesn\'t exist!');
    }
    
    localStorage.setItem('animals', JSON.stringify(filteredAnimals));
    return true;
};

export default new AnimalService(); 