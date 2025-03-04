/**
 * Name: Kaivan Shah
 * File name: create.js
 * Course: INFT 2202-07 Web Development - CSS  
 * Date: 2025-03-04
 * Description: This JavaScript file handles the animal creation and editing functionality.
 */

import animalService from './animal.mock.service.js';
import Animal from './Animal.js';

let editMode = false;
let currentAnimal = null;

// Utility function to wait for a specified time
function waitTho(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('animalForm');
    form.addEventListener('submit', submitAnimalForm);

    // Highlight the Create nav link
    const createNavLink = document.querySelector('a.nav-link[href="create.html"]');
    if (createNavLink) {
        createNavLink.classList.add('active');
    }

    // Check if we're in edit mode
    const params = new URL(window.location).searchParams;
    const id = params.get('id');
    
    if (id) {
        setupEditForm(id);
    }
});

function setupEditForm(id) {
    try {
        currentAnimal = animalService.findAnimal(id);
        editMode = true;

        // Update heading
        document.querySelector('h1').textContent = 'Edit Animal';

        // Get form and populate fields
        const form = document.getElementById('animalForm');
        form.name.value = currentAnimal.name;
        form.breed.value = currentAnimal.breed;
        form.eyes.value = currentAnimal.eyes;
        form.legs.value = currentAnimal.legs;
        form.sound.value = currentAnimal.sound;

        // Disable name field in edit mode
        form.name.disabled = true;

    } catch (error) {
        alert(error.message);
        window.location.href = 'list.html';
    }
}

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
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (validateAnimalForm(form)) {
        try {
            // Disable form and show loading state
            setFormLoading(form, true);
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

            if (editMode) {
                // Update existing animal
                currentAnimal.breed = form.breed.value.trim();
                currentAnimal.eyes = parseInt(form.eyes.value);
                currentAnimal.legs = parseInt(form.legs.value);
                currentAnimal.sound = form.sound.value.trim();
                
                animalService.updateAnimal(currentAnimal);
            } else {
                // Create new animal
                const animal = new Animal({
                    name: form.name.value.trim(),
                    breed: form.breed.value.trim(),
                    eyes: parseInt(form.eyes.value),
                    legs: parseInt(form.legs.value),
                    sound: form.sound.value.trim()
                });
                
                animalService.createAnimal(animal);
            }
            
            // Show success message
            messageBox.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i> 
                Animal ${editMode ? 'updated' : 'created'} successfully! Redirecting...
            `;
            messageBox.classList.remove('alert-danger');
            messageBox.classList.add('alert-success');
            messageBox.classList.remove('d-none');

            // Wait 3 seconds before redirecting
            await waitTho(3000);
            window.location.href = 'search.html';
            
        } catch (error) {
            setFormLoading(form, false);
            submitButton.innerHTML = 'Submit';
            showError(form.name, error.message);
            messageBox.innerHTML = `
                <div class="alert alert-danger">
                    ${error.message}
                </div>
            `;
            messageBox.classList.remove('d-none');
        }
    } else {
        messageBox.innerHTML = `
            <div class="alert alert-danger">
                Please fix the errors in the form.
            </div>
        `;
        messageBox.classList.remove('d-none');
    }
}

/**
 * Sets the loading state of the form
 * @param {HTMLFormElement} form - The form element
 * @param {boolean} isLoading - Whether the form is loading
 */
function setFormLoading(form, isLoading) {
    const inputs = form.querySelectorAll('input, button');
    inputs.forEach(input => {
        input.disabled = isLoading;
    });
}
