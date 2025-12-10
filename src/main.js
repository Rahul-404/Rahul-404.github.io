import { initNavbar } from "./components/navbar/navbar.js";
import { initHamNavbar } from "./components/ham-navbar/ham.navbar.js";
import { initHomeSection } from "./components/home/home.js";
import { initProjectSection} from "./components/project/project.js";
import { smoothScrollTo } from "./utils/scroll.js";

async function loadComponent(path, containerId) {
    const html = await fetch(path).then(res => res.text());
    document.getElementById(containerId).innerHTML = html;
}

window.currentlyFlippedId = null;

window.flipCard = function (id) {
    const clickedCard = document.getElementById(`card-${id}`);

    if (window.currentlyFlippedId && window.currentlyFlippedId !== id) {
        const previous = document.getElementById(`card-${window.currentlyFlippedId}`);
        if (previous) previous.classList.remove("flipped");
    }

    clickedCard.classList.toggle("flipped");

    window.currentlyFlippedId =
      clickedCard.classList.contains("flipped") ? id : null;

    window.initTabs(id);

    window.initCarousels(id);
};

window.initTabs = function (cardId) {
  const card = document.getElementById(`card-${cardId}`);
  if (!card) return;

  const tabButtons = card.querySelectorAll(".tab-btn");
  const tabContents = card.querySelectorAll(".tab-content");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");

      // Remove active from all buttons in this card
      tabButtons.forEach(b => b.classList.remove("active"));
      // Remove from all contents in this card
      tabContents.forEach(tc => tc.classList.remove("active"));

      // Activate clicked button
      btn.classList.add("active");

      // Activate correct tab-content
      const selectedTab = card.querySelector(`#${target}`);
      if (selectedTab) selectedTab.classList.add("active");
    });
  });
}

window.initCarousels = function (cardId) {
  const card = document.getElementById(`card-${cardId}`);
  if (!card) return;

  const carousels = card.querySelectorAll(".carousel");

  carousels.forEach(carousel => {
    const track = carousel.querySelector(".carousel-track");
    const slides = carousel.querySelectorAll(".carousel-track a");
    const prevButton = carousel.querySelector(".prev");
    const nextButton = carousel.querySelector(".next");

    let index = 0;
    const totalSlides = slides.length;

    function updateCarousel() {
      const offset = -index * 100;
      track.style.transform = `translateX(${offset}%)`;
    }

    prevButton.addEventListener("click", () => {
      index = (index - 1 + totalSlides) % totalSlides;
      updateCarousel();
    });

    nextButton.addEventListener("click", () => {
      index = (index + 1) % totalSlides;
      updateCarousel();
    });
  });
};


window.addEventListener("DOMContentLoaded", async () => {
  
  await loadComponent("../src/components/navbar/navbar.html", "desktop-navbar");
  initNavbar();
  smoothScrollTo();
  
  await loadComponent("../src/components/ham-navbar/ham.navbar.html", "hamburger-navbar");
  initHamNavbar();
  
  await loadComponent("../src/components/home/home.html", "profile");
  initHomeSection();
  
  await loadComponent("../src/components/about/about.html", "about");

  await loadComponent("../src/components/project/project.html", "project");

  // VERY IMPORTANT – wait for DOM to update

  // await new Promise(requestAnimationFrame);
  initProjectSection();
  
//   initTabsForAllCards();

  // await loadComponent("../src/components/publication/publications.html", "publication");

  await loadComponent("../src/components/certifications/certificates.html", "certificates");

  // await loadComponent("../src/components/blog/blog.html", "blog");

  await loadComponent("../src/components/contact/contact.html", "contact");

  await loadComponent("../src/components/footer/footer.html", "footer");

  console.log("Website initialized!");
});
