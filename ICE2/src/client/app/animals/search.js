/**
 * Name: Kaivan Shah
 * File name: search.js
 * Course: INFT 2202-07 Web Development - CSS  
 * Date: 2025-02-27
 * Description: This JavaScript file handles the animal search functionality.
 */

import animalService from './animal.mock.service.js';

const ITEMS_PER_PAGE = 5;
let currentPage = 1;

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const messageBox = document.getElementById('message-box');
    const table = document.getElementById('animals-list');
    
    // Always show message box and hide table in search page
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
    const pagination = document.querySelector('nav[aria-label="Page navigation"]');

    if (animals && animals.length > 0) {
        messageBox.classList.add('d-none');
        table.classList.remove('d-none');
        
        // Show pagination if more than 5 items
        if (animals.length > ITEMS_PER_PAGE) {
            pagination.classList.remove('d-none');
        } else {
            pagination.classList.add('d-none');
        }
        
        drawAnimalsTable(animals);
    } else {
        messageBox.classList.remove('d-none');
        table.classList.add('d-none');
        pagination.classList.add('d-none');
    }
}

/**
 * Draws the animals table with the provided data
 * @param {Array} animals - List of animals to display
 */
function drawAnimalsTable(animals) {
    const tbody = document.querySelector('#animals-list tbody');
    tbody.innerHTML = '';

    // Calculate slice indexes for pagination
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageAnimals = animals.slice(start, end);

    pageAnimals.forEach(animal => {
        const row = tbody.insertRow();
        
        // Owner cell
        const ownerCell = row.insertCell();
        ownerCell.textContent = 'Kaivan Shah';

        // Details cell
        const detailsCell = row.insertCell();
        detailsCell.textContent = animal.toString();

        // Update controls with tooltips and modal
        const controlsCell = row.insertCell();
        controlsCell.innerHTML = `
            <button class="btn btn-sm btn-primary me-2" 
                    data-bs-toggle="tooltip" 
                    title="Edit this animal"
                    onclick="editAnimal('${animal.id}')">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="btn btn-sm btn-danger" 
                    data-bs-toggle="tooltip" 
                    title="Delete this animal"
                    onclick="showDeleteModal('${animal.id}')">
                <i class="fas fa-trash"></i> Delete
            </button>
        `;
    });

    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(tooltip => new bootstrap.Tooltip(tooltip));

    // Draw pagination if needed
    if (animals.length > ITEMS_PER_PAGE) {
        drawPagination(animals);
    }
}

function drawPagination(animals) {
    const totalPages = Math.ceil(animals.length / ITEMS_PER_PAGE);
    const pagination = document.getElementById('pagination');
    
    pagination.innerHTML = `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a>
        </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <li class="page-item ${currentPage === i ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `;
    }

    pagination.innerHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage + 1}">Next</a>
        </li>
    `;

    // Add click handlers
    pagination.querySelectorAll('.page-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const newPage = parseInt(e.target.dataset.page);
            if (!isNaN(newPage) && newPage > 0 && newPage <= totalPages) {
                currentPage = newPage;
                drawAnimalsTable(animals);
            }
        });
    });
}

// Make these functions available globally for the onclick handlers
window.editAnimal = function(id) {
    window.location.href = `create.html?id=${id}`;
};

window.deleteAnimal = function(id) {
    if (confirm('Are you sure you want to delete this animal?')) {
        try {
            const animal = animalService.findAnimal(id);
            animalService.deleteAnimal(animal);
            
            const animals = animalService.listAnimals();
            toggleTableVisibility(animals);
        } catch (error) {
            alert(error.message);
        }
    }
};

// Add delete modal to search.html
window.showDeleteModal = function(id) {
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    document.getElementById('confirmDelete').onclick = () => {
        deleteAnimal(id);
        modal.hide();
    };
    modal.show();
};
