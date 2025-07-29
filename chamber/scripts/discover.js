document.addEventListener('DOMContentLoaded', () => {
  const dataUrl = '/data/discover-data.json';
  const container = document.getElementById('discover-container');
  const visitMsgContainer = document.getElementById('visit-message');

  // Fetch and render discover items
  async function loadDiscoverItems() {
    try {
      const response = await fetch(dataUrl);
      if (!response.ok) throw new Error('Failed to fetch data');

      const items = await response.json();
      container.innerHTML = ''; // Clear container

      items.forEach(item => {
        const card = document.createElement('article');
        card.className = 'discover-card';

        card.innerHTML = `
          <h2>${item.title}</h2>
          <figure>
            <img src="${item.image}" alt="${item.title}" width="300" height="200" loading="lazy" />
          </figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button type="button" aria-label="Learn more about ${item.title}">Learn More</button>
        `;
        container.appendChild(card);
      });

      addImageHoverEffect();
    } catch (error) {
      container.innerHTML = '<p>Sorry, failed to load the discover items.</p>';
      console.error(error);
    }
  }

  // Calculate and display visit message
  function showVisitMessage() {
    const now = Date.now();
    const lastVisit = localStorage.getItem('lastVisit');
    let message = 'Welcome! Let us know if you have any questions.';

    if (lastVisit) {
      const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
      if (daysSince === 0) {
        message = 'Back so soon! Awesome!';
      } else if (daysSince === 1) {
        message = 'You last visited 1 day ago.';
      } else {
        message = `You last visited ${daysSince} days ago.`;
      }
    }
    visitMsgContainer.textContent = message;

    // Update lastVisit in localStorage
    localStorage.setItem('lastVisit', now.toString());
  }

  // Add hover effect on images except on small screens
  function addImageHoverEffect() {
    if (window.matchMedia('(min-width: 641px)').matches) {
      const images = container.querySelectorAll('img');
      images.forEach(img => {
        img.classList.add('hover-effect');
      });
    }
  }

  loadDiscoverItems();
  showVisitMessage();
});
