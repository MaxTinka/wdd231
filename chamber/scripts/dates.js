// Function to update the copyright year and last modified date
function updateFooterDates() {
    try {
        // Get current year for copyright
        const currentYear = new Date().getFullYear();
        const yearElement = document.getElementById('current-year');
        
        if (yearElement) {
            yearElement.textContent = currentYear;
        } else {
            console.warn('Copyright year element not found');
        }

        // Get last modified date
        const lastModifiedElement = document.getElementById('lastModified');
        
        if (lastModifiedElement) {
            // Format the last modified date nicely
            const lastModified = new Date(document.lastModified);
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            const formattedDate = lastModified.toLocaleDateString('en-US', options);
            
            lastModifiedElement.textContent = formattedDate;
            
            // Add machine-readable date
            lastModifiedElement.setAttribute('datetime', lastModified.toISOString());
        } else {
            console.warn('Last modified element not found');
        }
    } catch (error) {
        console.error('Error updating footer dates:', error);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', updateFooterDates);

// Update the dates every minute (optional)
setInterval(updateFooterDates, 60000);
