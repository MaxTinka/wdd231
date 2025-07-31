// File: js/discover.js

document.addEventListener("DOMContentLoaded", () => {
  fetch("../data/interests.json")
    .then((response) => response.json())
    .then((data) => displayItems(data));

  updateLastVisit();
});

function displayItems(items) {
  const grid = document.querySelector(".interest-grid");
  grid.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("section");
    card.classList.add("interest-card");

    card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button>Learn More</button>
    `;

    grid.appendChild(card);
  });
}

function updateLastVisit() {
  const sidebar = document.querySelector(".sidebar-message");
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  let message = "";

  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const difference = now - parseInt(lastVisit, 10);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    if (days < 1) {
      message = "Back so soon! Awesome!";
    } else if (days === 1) {
      message = "You last visited 1 day ago.";
    } else {
      message = `You last visited ${days} days ago.`;
    }
  }

  sidebar.textContent = message;
  localStorage.setItem("lastVisit", now);
}
