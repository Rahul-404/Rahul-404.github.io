function trackEvent(eventName, params = {}) {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params
    });
  } else {
    console.warn("dataLayer not found");
  }
}

// ---- NAVIGATION BAR TRACKING ----

const navLinks = [
  "nav-profile-section",
  "nav-about-section",
  "nav-project-section",
  "nav-certificates-section",
  "nav-blog-section",
  "nav-contact-section",
  "nav-more-button"
];

// Attach event listeners for all navigation items
navLinks.forEach(id => {
  const element = document.getElementById(id);
  if (element) {
    element.addEventListener("click", () => {
      // Extract readable label from the element’s text
      const label = element.textContent.trim();

      // Push event to GA4 via dataLayer
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "nav_click",
          menu_item: label,
          element_id: id
        });
      } else {
        console.warn("dataLayer not found");
      }
    });
  }
});


// ---------- Hero Section ----------
document.querySelector("#downloadCV")?.addEventListener("click", () => {
  trackEvent("button_click", { button: "Download CV" });
});
document.querySelector("#viewWork")?.addEventListener("click", () => {
  trackEvent("button_click", { button: "View My Work" });
});

// ---------- Skills (About Section) ----------
document.querySelectorAll(".skill-box").forEach(skill => {
  skill.addEventListener("mouseenter", () => {
    const skillName = skill.querySelector(".skill-title").textContent.trim();
    trackEvent("skill_hover", { skill: skillName });
  });
});

// ---------- Projects ----------
document.querySelectorAll(".project-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    const tabName = tab.textContent.trim();
    trackEvent("project_tab_click", { tab: tabName });
  });
});

document.querySelectorAll(".project-card .github-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const project = btn.closest(".project-card").querySelector(".project-title").textContent.trim();
    trackEvent("github_click", { project });
  });
});

document.querySelectorAll(".project-card .flip-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const project = btn.closest(".project-card").querySelector(".project-title").textContent.trim();
    trackEvent("flip_card", { project });
  });
});

document.querySelectorAll(".project-card .medium-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const project = btn.closest(".project-card").querySelector(".project-title").textContent.trim();
    trackEvent("medium_doc_click", { project });
  });
});

// ---------- Certificates ----------
document.querySelectorAll(".certificate-card").forEach(card => {
  card.addEventListener("click", () => {
    const certName = card.querySelector(".cert-title").textContent.trim();
    trackEvent("certificate_click", { certificate: certName });
  });
});

// ---------- Blog Section ----------
document.querySelectorAll(".blog-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    const category = tab.textContent.trim();
    trackEvent("blog_tab_click", { category });
  });
});

document.querySelectorAll(".blog-card").forEach(card => {
  card.addEventListener("click", () => {
    const blogTitle = card.querySelector(".blog-title").textContent.trim();
    trackEvent("blog_click", { blog: blogTitle });
  });
});

// ---------- Contact Section ----------
document.querySelector("#emailBtn")?.addEventListener("click", () => {
  trackEvent("contact_click", { method: "Email" });
});
document.querySelector("#linkedinBtn")?.addEventListener("click", () => {
  trackEvent("contact_click", { method: "LinkedIn" });
});

// ---------- Scroll Depth Tracking ----------
window.addEventListener("scroll", () => {
  const scrollDepth = Math.round(
    ((window.scrollY + window.innerHeight) / document.body.scrollHeight) * 100
  );
  if (scrollDepth % 25 === 0) { // Track every 25%
    trackEvent("scroll_depth", { percentage: scrollDepth });
  }
});
