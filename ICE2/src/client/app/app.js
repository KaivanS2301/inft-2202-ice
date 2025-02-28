/**
 * Name: Kaivan Shah
 * File name: app.js
 * Course: INFT 2202-07 Web Development - CSS  
 * Date: 2025-02-27
 * Description: This JavaScript file handles the dynamic year update in the footer.
 */

// Set copyright year in footer
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('copyright').textContent = new Date().getFullYear();
});
