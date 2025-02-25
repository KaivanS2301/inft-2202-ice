/**
 * Name: Kaivan Shah
 * File name: Animal.js
 * Course: INFT 2202-07 Web Development - CSS  
 * Date: 2025-02-25
 * Description: This JavaScript file defines the Animal model class.
 */

export default class Animal {
    constructor({ id = null, name, breed, eyes, legs, sound }) {
        this.id = id || crypto.randomUUID();
        this.name = name;
        this.breed = breed;
        this.eyes = eyes;
        this.legs = legs;
        this.sound = sound;
    }

    toString() {
        return `${this.name} is a ${this.breed} with ${this.eyes} eyes and ${this.legs} legs that says "${this.sound}"`;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            breed: this.breed,
            eyes: this.eyes,
            legs: this.legs,
            sound: this.sound
        };
    }
} 