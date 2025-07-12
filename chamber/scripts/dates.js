// Function to update footer dates
function updateFooterDates() {
    try {
        // Update copyright year
        const currentYear = new Date().getFullYear();
        const yearElement = document.getElementById('current-year');
        
        if (yearElement) {
            yearElement.textContent = currentYear;
        } else {
            console.warn('Copyright year element not found');
        }

        // Update last modified date
        const lastModifiedElement = document.getElementById('lastModified');
        
        if (lastModifiedElement) {
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

// Optional: Update every minute to keep dates current
setInterval(updateFooterDates, 60000);
