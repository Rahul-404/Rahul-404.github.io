import { smoothScrollTo } from "../../utils/scroll.js";

export function initNavbar() {
  console.log("Navbar initialized");

  // Smooth scrolling
  document.querySelectorAll("[data-scroll]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      smoothScrollTo(link.getAttribute("data-scroll"));
    });
  });

  // Dropdown toggle
  const dropdownParent = document.querySelector(".dropdown-parent");
  const toggleBtn = document.querySelector(".dropdown-toggle");

  toggleBtn.addEventListener("click", () => {
    dropdownParent.classList.toggle("open");
  });
}
