/**
 * Name: Kaivan Shah
 * File name: list.js
 * Course: INFT 2202-07 Web Development - CSS  
 * Date: 2025-02-25
 * Description: This JavaScript file handles the animal listing functionality.
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const messageBox = document.getElementById('message-box');
    const table = document.getElementById('animals-list');
    
    // Always show message box and hide table
    messageBox.classList.remove('d-none');
    table.classList.add('d-none');
}); 