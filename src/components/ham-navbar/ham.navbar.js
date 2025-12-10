import { smoothScrollTo } from "../../utils/scroll.js";

export function initHamNavbar() {
  console.log("Ham Navbar initialized");

  // Smooth scrolling
  document.querySelectorAll("[data-scroll]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      smoothScrollTo(link.getAttribute("data-scroll"));
    });
  });

  // variables for hamburger menu
  const hamMenu = document.querySelector(".ham-navbar");
  const slideMenu = document.querySelector(".slide");

  // Event listner for hamburger menu
  hamMenu.addEventListener('click', function (e) {
      hamMenu.classList.toggle('active');
      slideMenu.classList.toggle('active');
  });
  
}
