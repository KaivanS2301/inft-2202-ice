/**
 * Name: Kaivan Shah
 * File name: create.js
 * Course: INFT 2202-07 Web Development - CSS  
 * Date: 2025-02-25
 * Description: This JavaScript file handles the animal creation functionality.
 */

import animalService from './animal.mock.service.js';
import Animal from './Animal.js';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    const animalForm = document.getElementById('animalForm');
    
    // Add submit event handler
    animalForm.addEventListener('submit', submitAnimalForm);
});

/**
 * Validates the animal form
 * @param {HTMLFormElement} form - The form element to validate
 * @returns {boolean} - True if form is valid, false otherwise
 */
function validateAnimalForm(form) {
    let isValid = true;
    
    // Validate breed
    const breed = form.breed.value.trim();
    if (breed === '') {
        showError(form.breed, 'Breed is required');
        isValid = false;
    } else {
        showSuccess(form.breed);
    }

    // Validate name
    const name = form.name.value.trim();
    if (name === '') {
        showError(form.name, 'Name is required');
        isValid = false;
    } else {
        showSuccess(form.name);
    }

    // Validate eyes
    const eyes = form.eyes.value;
    if (eyes === '' || eyes < 0) {
        showError(form.eyes, 'Number of eyes must be 0 or greater');
        isValid = false;
    } else {
        showSuccess(form.eyes);
    }

    // Validate legs
    const legs = form.legs.value;
    if (legs === '' || legs < 0) {
        showError(form.legs, 'Number of legs must be 0 or greater');
        isValid = false;
    } else {
        showSuccess(form.legs);
    }

    // Validate sound
    const sound = form.sound.value.trim();
    if (sound === '') {
        showError(form.sound, 'Sound is required');
        isValid = false;
    } else {
        showSuccess(form.sound);
    }

    return isValid;
}

/**
 * Shows error message and highlights field in red
 * @param {HTMLElement} input - The input element
 * @param {string} message - The error message to display
 */
function showError(input, message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
    errorElement.classList.remove('d-none');
}

/**
 * Shows success state and highlights field in green
 * @param {HTMLElement} input - The input element
 */
function showSuccess(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    const errorElement = input.nextElementSibling;
    errorElement.classList.add('d-none');
}

/**
 * Handles form submission
 * @param {Event} event - The submit event
 */
async function submitAnimalForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const messageBox = document.getElementById('message-box');
    
    if (validateAnimalForm(form)) {
        try {
            const animal = new Animal({
                name: form.name.value.trim(),
                breed: form.breed.value.trim(),
                eyes: parseInt(form.eyes.value),
                legs: parseInt(form.legs.value),
                sound: form.sound.value.trim()
            });

            animalService.createAnimal(animal);
            
            // Show success message with spinner
            messageBox.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i> 
                Animal created successfully! Redirecting...
            `;
            messageBox.classList.remove('alert-danger');
            messageBox.classList.add('alert-success');
            messageBox.classList.remove('d-none');

            // Wait 3 seconds before redirecting
            await new Promise(resolve => setTimeout(resolve, 3000));
            window.location.href = 'list.html';
            
        } catch (error) {
            // Show error under name field
            showError(form.name, error.message);
            
            // Show general error message
            messageBox.textContent = error.message;
            messageBox.classList.add('alert-danger');
            messageBox.classList.remove('alert-success');
            messageBox.classList.remove('d-none');
        }
    } else {
        messageBox.textContent = 'Please fix the errors in the form.';
        messageBox.classList.add('alert-danger');
        messageBox.classList.remove('alert-success');
        messageBox.classList.remove('d-none');
    }
}
