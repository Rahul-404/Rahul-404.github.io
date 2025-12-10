export function smoothScrollTo(selector) {
  const section = document.querySelector(selector);
  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}
