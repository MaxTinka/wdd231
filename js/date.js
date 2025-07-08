// Update copyright year and last modified date
document.addEventListener('DOMContentLoaded', () => {
    // Get current year for copyright
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
    
    // Get last modified date
    document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
});