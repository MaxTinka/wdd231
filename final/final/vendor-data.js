// vendor-data.js

async function loadVendors() {
  const container = document.getElementById('vendor-list');

  try {
    const response = await fetch('data/vendors.json');
    if (!response.ok) throw new Error('Network response was not OK');

    const vendors = await response.json();

    vendors.forEach(vendor => {
      const card = document.createElement('div');
      card.classList.add('vendor-card');

      card.innerHTML = `
        <img src="${vendor.image}" alt="${vendor.name} food photo">
        <h3>${vendor.name}</h3>
        <p><strong>Dish:</strong> ${vendor.dish}</p>
        <p><strong>Location:</strong> ${vendor.location}</p>
        <p><strong>Rating:</strong> ${vendor.rating} ⭐</p>
        <p><strong>Price:</strong> ${vendor.price}</p>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Failed to load vendors:', error);
    container.innerHTML = `<p>Unable to load vendors. Please try again later.</p>`;
  }
}

// Run on page load
loadVendors();
