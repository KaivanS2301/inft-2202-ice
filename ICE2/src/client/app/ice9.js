/**
 * Name: Kaivan Shah
 * File name: ice9.js
 * Course: INFT 2202-07 Web Development - CSS  
 * Date: 2025-02-27
 * Description: This JavaScript file demonstrates different ways to fetch data using XHR, Fetch Promise, and Async/Await.
 */

const ITEMS_PER_PAGE = 5;
let currentPage = 1;
let animals = [];

// Utility function to wait for a specified time
function waitTho(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// XHR implementation
function xhrAnimals() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        console.log('Attempting to fetch from:', './data/animals.json');
        xhr.open('GET', './data/animals.json', true);
        
        // Using load event
        xhr.addEventListener('load', function() {
            console.log('XHR Status:', xhr.status);
            console.log('XHR Response:', xhr.responseText);
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    resolve(data);
                } catch (error) {
                    console.error('JSON Parse Error:', error);
                    reject(error);
                }
            } else {
                reject(new Error(`HTTP Error: ${xhr.status}`));
            }
        });

        // Using readystatechange event (commented out)
        /*
        xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {  // or xhr.readyState === 4
                console.log('XHR ReadyState:', xhr.readyState);
                console.log('XHR Status:', xhr.status);
                if (xhr.status === 200) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        resolve(data);
                    } catch (error) {
                        console.error('JSON Parse Error:', error);
                        reject(error);
                    }
                } else {
                    reject(new Error(`HTTP Error: ${xhr.status}`));
                }
            }
        });
        */

        xhr.addEventListener('error', function(e) {
            console.error('XHR Error:', e);
            reject(new Error('Network Error'));
        });

        xhr.send();
    });
}

// Fetch implementation using Promises
function fetchAnimalsPromise() {
    console.log('Attempting fetch with Promise from:', './data/animals.json');
    return fetch('./data/animals.json')
        .then(response => {
            console.log('Fetch Response:', response);
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            throw error;
        });
}

// Fetch implementation using Async/Await
async function fetchAnimalsAsync() {
    try {
        console.log('Attempting fetch with Async/Await from:', './data/animals.json');
        const response = await fetch('./data/animals.json');
        console.log('Async/Await Response:', response);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Async/Await Error:', error);
        throw error;
    }
}

// Function to draw the animals table
function drawAnimalsTable(animals) {
    const tbody = document.querySelector('#animals-list tbody');
    if (!tbody) {
        console.error('Table body not found!');
        return;
    }
    
    // Clear existing content
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
        detailsCell.textContent = `${animal.name} is a ${animal.breed} with ${animal.eyes} eyes and ${animal.legs} legs that says ${animal.sound}`;
    });

    // Draw pagination if needed
    if (animals.length > ITEMS_PER_PAGE) {
        drawPagination(animals);
    }
}

// Function to draw pagination
function drawPagination(animals) {
    const totalPages = Math.ceil(animals.length / ITEMS_PER_PAGE);
    const pagination = document.getElementById('pagination');
    
    if (!pagination) {
        console.error('Pagination element not found!');
        return;
    }
    
    // Clear existing content
    pagination.innerHTML = '';

    // Previous button
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    const prevLink = document.createElement('a');
    prevLink.className = 'page-link';
    prevLink.href = '#';
    prevLink.textContent = 'Previous';
    prevLink.dataset.page = currentPage - 1;
    prevLi.appendChild(prevLink);
    pagination.appendChild(prevLi);

    // Function to add page number
    function addPageNumber(i) {
        const pageLi = document.createElement('li');
        pageLi.className = `page-item ${currentPage === i ? 'active' : ''}`;
        const pageLink = document.createElement('a');
        pageLink.className = 'page-link';
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.dataset.page = i;
        pageLi.appendChild(pageLink);
        pagination.appendChild(pageLi);
    }

    // Function to add ellipsis
    function addEllipsis() {
        const ellipsisLi = document.createElement('li');
        ellipsisLi.className = 'page-item disabled';
        const ellipsisSpan = document.createElement('span');
        ellipsisSpan.className = 'page-link';
        ellipsisSpan.textContent = '...';
        ellipsisLi.appendChild(ellipsisSpan);
        pagination.appendChild(ellipsisLi);
    }

    // First page
    addPageNumber(1);

    // Handle middle pages
    if (totalPages > 1) {
        if (currentPage > 3) {
            addEllipsis();
        }

        // Show pages around current page
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            addPageNumber(i);
        }

        if (currentPage < totalPages - 2) {
            addEllipsis();
        }

        // Last page
        if (totalPages > 1) {
            addPageNumber(totalPages);
        }
    }

    // Next button
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    const nextLink = document.createElement('a');
    nextLink.className = 'page-link';
    nextLink.href = '#';
    nextLink.textContent = 'Next';
    nextLink.dataset.page = currentPage + 1;
    nextLi.appendChild(nextLink);
    pagination.appendChild(nextLi);

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

// Function to toggle table visibility
function toggleTableVisibility(animals) {
    const messageBox = document.getElementById('message-box');
    const table = document.getElementById('animals-list');
    const pagination = document.querySelector('nav[aria-label="Page navigation"]');

    if (animals && animals.length > 0) {
        messageBox.classList.add('d-none');
        table.classList.remove('d-none');
        
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

// Render functions for each fetch method
function renderXhrPage() {
    const messageBox = document.getElementById('message-box');
    messageBox.classList.remove('d-none');
    messageBox.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading animals...';
    
    xhrAnimals()
        .then(data => {
            animals = data;
            toggleTableVisibility(animals);
        })
        .catch(error => {
            messageBox.innerHTML = `Error loading animals: ${error.message}`;
            messageBox.classList.remove('d-none');
        });
}

function renderSyncPage() {
    const messageBox = document.getElementById('message-box');
    messageBox.classList.remove('d-none');
    messageBox.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading animals...';
    
    fetchAnimalsPromise()
        .then(data => {
            animals = data;
            toggleTableVisibility(animals);
        })
        .catch(error => {
            messageBox.innerHTML = `Error loading animals: ${error.message}`;
            messageBox.classList.remove('d-none');
        });
}

async function renderAsyncPage() {
    const messageBox = document.getElementById('message-box');
    messageBox.classList.remove('d-none');
    messageBox.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading animals...';
    
    try {
        animals = await fetchAnimalsAsync();
        toggleTableVisibility(animals);
    } catch (error) {
        messageBox.innerHTML = `Error loading animals: ${error.message}`;
        messageBox.classList.remove('d-none');
    }
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Uncomment only one of these lines to test different implementations
    renderXhrPage();
    // renderSyncPage();
    // renderAsyncPage();
}); 