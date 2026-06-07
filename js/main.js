const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  navLinks?.classList.toggle("active");
});

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks?.classList.remove("active");
  });
});

const FAVORITES_KEY = "resumehub.favoriteTemplates.v1";
const templateGrid = document.querySelector(".gallery-grid");

function getFavoriteTemplates() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

function saveFavoriteTemplates(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function getTemplateId(card) {
  const link = card.querySelector('a[href*="template="]');
  if (!link) return "";
  return new URL(link.getAttribute("href"), window.location.href).searchParams.get("template") || "";
}

function sortFavoriteTemplates() {
  if (!templateGrid) return;
  const favorites = getFavoriteTemplates();
  [...templateGrid.querySelectorAll(".template-card")]
    .sort((first, second) => {
      const firstId = getTemplateId(first);
      const secondId = getTemplateId(second);
      const firstFavorite = favorites.includes(firstId);
      const secondFavorite = favorites.includes(secondId);
      return Number(secondFavorite) - Number(firstFavorite);
    })
    .forEach((card) => templateGrid.appendChild(card));
}

function setupTemplateFavorites() {
  if (!templateGrid) return;

  const favorites = getFavoriteTemplates();
  templateGrid.querySelectorAll(".template-card").forEach((card) => {
    const templateId = getTemplateId(card);
    if (!templateId) return;

    const button = document.createElement("button");
    button.className = "favorite-template-btn";
    button.type = "button";
    button.setAttribute("aria-label", "Add template to favorites");
    button.innerHTML = '<i class="fa-regular fa-heart"></i>';

    const setState = () => {
      const active = getFavoriteTemplates().includes(templateId);
      card.classList.toggle("favorite", active);
      button.classList.toggle("active", active);
      button.setAttribute(
        "aria-label",
        active ? "Remove template from favorites" : "Add template to favorites",
      );
      button.innerHTML = active
        ? '<i class="fa-solid fa-heart"></i>'
        : '<i class="fa-regular fa-heart"></i>';
    };

    button.addEventListener("click", () => {
      const currentFavorites = getFavoriteTemplates();
      const nextFavorites = currentFavorites.includes(templateId)
        ? currentFavorites.filter((id) => id !== templateId)
        : [...currentFavorites, templateId];
      saveFavoriteTemplates(nextFavorites);
      setState();
      sortFavoriteTemplates();
    });

    card.prepend(button);
    card.classList.toggle("favorite", favorites.includes(templateId));
    setState();
  });

  sortFavoriteTemplates();
}

setupTemplateFavorites();

function updateLandingAuthUI() {
  if (!window.ResumeHubAPI?.isAuthenticated()) return;

  document
    .querySelectorAll('.hero-buttons a[href*="register"], .cta-section a[href*="register"]')
    .forEach((link) => {
      link.href = window.ResumeHubAPI.resolvePath("pages/dashboard.html");
      link.textContent =
        link.closest(".cta-section") ? "Go to Dashboard" : "Open Dashboard";
    });
}

document.addEventListener("DOMContentLoaded", updateLandingAuthUI);
