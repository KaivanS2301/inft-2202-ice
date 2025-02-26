/**
 * Name: Kaivan Shah
 * File name: search.js
 * Course: INFT 2202-07 Web Development - CSS  
 * Date: 2025-02-25
 * Description: This JavaScript file handles the animal search functionality.
 */

import animalService from './animal.mock.service.js';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const messageBox = document.getElementById('message-box');
    const table = document.getElementById('animals-list');
    
    // Always show message box and hide table
    messageBox.classList.remove('d-none');
    table.classList.add('d-none');
});

/**
 * Toggles visibility of table and message box based on animals list
 * @param {Array} animals - List of animals
 */
function toggleTableVisibility(animals) {
    const messageBox = document.getElementById('message-box');
    const table = document.getElementById('animals-list');

    if (animals && animals.length > 0) {
        messageBox.classList.add('d-none');
        table.classList.remove('d-none');
        drawAnimalsTable(animals);
    } else {
        messageBox.classList.remove('d-none');
        table.classList.add('d-none');
    }
}

/**
 * Draws the animals table with the provided data
 * @param {Array} animals - List of animals to display
 */
function drawAnimalsTable(animals) {
    const tbody = document.querySelector('#animals-list tbody');
    tbody.innerHTML = ''; // Clear existing rows

    animals.forEach(animal => {
        const row = tbody.insertRow();
        
        // Owner cell
        const ownerCell = row.insertCell();
        ownerCell.textContent = 'Kaivan Shah';

        // Details cell
        const detailsCell = row.insertCell();
        detailsCell.textContent = animal.toString();

        // Controls cell
        const controlsCell = row.insertCell();
        controlsCell.innerHTML = `
            <button class="btn btn-sm btn-primary me-2" onclick="editAnimal('${animal.id}')">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="btn btn-sm btn-danger" onclick="deleteAnimal('${animal.id}')">
                <i class="fas fa-trash"></i> Delete
            </button>
        `;
    });
}

// Make these functions available globally for the onclick handlers
window.editAnimal = function(id) {
    try {
        const animal = animalService.findAnimal(id);
        window.location.href = `edit.html?id=${id}`;
    } catch (error) {
        alert(error.message);
    }
};

window.deleteAnimal = async function(id) {
    if (confirm('Are you sure you want to delete this animal?')) {
        try {
            const animal = animalService.findAnimal(id);
            animalService.deleteAnimal(animal);
            
            // Refresh the table
            const animals = animalService.listAnimals();
            toggleTableVisibility(animals);
        } catch (error) {
            alert(error.message);
        }
    }
};
