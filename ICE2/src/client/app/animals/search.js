/**
 * Name: Kaivan Shah
 * File name: search.js
 * Course: INFT 2202-07 Web Development - CSS  
 * Date: 2025-03-04
 * Description: This JavaScript file handles the animal search functionality.
 */

import animalService from './animal.mock.service.js';

const ITEMS_PER_PAGE = 5;
let currentPage = 1;

// Utility function to wait for a specified time
function waitTho(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM Content Loaded');
    
    // Check if animalService is available
    if (!animalService) {
        console.error('Animal service is not available!');
        return;
    }
    
    const messageBox = document.getElementById('message-box');
    const table = document.getElementById('animals-list');
    const pagination = document.querySelector('nav[aria-label="Page navigation"]');
    
    console.log('Elements found:', {
        messageBox: !!messageBox,
        table: !!table,
        pagination: !!pagination,
        tableHTML: table ? table.outerHTML : 'Table not found'
    });
    
    // Show loading message
    if (messageBox) {
        messageBox.classList.remove('d-none');
        messageBox.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading animals...';
    }
    
    // Wait 3 seconds
    await waitTho(3000);
    
    try {
        // Get and display animals
        console.log('Calling animalService.listAnimals()');
        const animals = animalService.listAnimals();
        console.log('Animals loaded:', animals);
        
        if (animals && animals.length > 0) {
            console.log('Showing table with', animals.length, 'animals');
            // Hide message box and show table
            if (messageBox) messageBox.classList.add('d-none');
            if (table) {
                table.classList.remove('d-none');
                table.style.display = 'table'; // Force table display
                console.log('Table display style:', table.style.display);
                console.log('Table classes:', table.className);
            }
            
            // Show pagination if more than 5 items
            if (pagination) {
                if (animals.length > ITEMS_PER_PAGE) {
                    pagination.classList.remove('d-none');
                } else {
                    pagination.classList.add('d-none');
                }
            }
            
            drawAnimalsTable(animals);
        } else {
            console.log('No animals found, showing message');
            if (messageBox) {
                messageBox.innerHTML = 'There are currently no animals in the database. Try adding some!';
                messageBox.classList.remove('d-none');
            }
            if (table) table.classList.add('d-none');
            if (pagination) pagination.classList.add('d-none');
        }
    } catch (error) {
        console.error('Error loading animals:', error);
        if (messageBox) {
            messageBox.innerHTML = 'Error loading animals. Please try again.';
            messageBox.classList.remove('d-none');
        }
        if (table) table.classList.add('d-none');
        if (pagination) pagination.classList.add('d-none');
    }

    // Highlight the Search nav link
    const searchNavLink = document.querySelector('a.nav-link[href="search.html"]');
    if (searchNavLink) {
        searchNavLink.classList.add('active');
    }
});

/**
 * Draws the animals table with the provided data
 * @param {Array} animals - List of animals to display
 */
function drawAnimalsTable(animals) {
    console.log('Drawing animals table');
    const tbody = document.querySelector('#animals-list tbody');
    if (!tbody) {
        console.error('Table body not found!');
        console.log('Table HTML:', document.getElementById('animals-list')?.outerHTML);
        return;
    }
    
    // Clear existing content
    tbody.innerHTML = '';
    
    // Calculate slice indexes for pagination
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageAnimals = animals.slice(start, end);
    
    console.log('Drawing', pageAnimals.length, 'animals for current page');

    pageAnimals.forEach(animal => {
        console.log('Creating row for animal:', animal);
        const row = tbody.insertRow();
        
        // Owner cell
        const ownerCell = row.insertCell();
        ownerCell.textContent = 'Kaivan Shah';

        // Details cell
        const detailsCell = row.insertCell();
        detailsCell.textContent = `${animal.name} is a ${animal.breed} with ${animal.eyes} eyes and ${animal.legs} legs that says ${animal.sound}`;

        // Controls cell
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
            drawAnimalsTable(animals);
        } catch (error) {
            alert(error.message);
        }
    }
};

// Update the delete modal handler
window.showDeleteModal = function(id) {
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    const confirmButton = document.getElementById('confirmDelete');
    
    confirmButton.onclick = async () => {
        // Disable button and show spinner
        confirmButton.disabled = true;
        confirmButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting...';
        
        try {
            // Wait 3 seconds
            await waitTho(3000);
            
            const animal = animalService.findAnimal(id);
            animalService.deleteAnimal(animal);
            
            // Show success message
            const messageBox = document.getElementById('message-box');
            messageBox.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Animal deleted successfully! Refreshing...';
            messageBox.classList.remove('d-none');
            
            // Wait another second to show the success message
            await waitTho(1000);
            
            // Refresh the page
            window.location.reload();
        } catch (error) {
            alert(error.message);
            // Reset button state
            confirmButton.disabled = false;
            confirmButton.innerHTML = 'Delete';
        }
    };
    
    modal.show();
};
