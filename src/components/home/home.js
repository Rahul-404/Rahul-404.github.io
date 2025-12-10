export function initHomeSection() {
    console.log("Home Section initialized");
    // Download CV
    document.querySelector(".download-cv-btn")
        .addEventListener("click", () => {
            window.open("./assets/resume.pdf");
        });

    // View My Work
    document.querySelector(".view-work-btn")
        .addEventListener("click", () => {
            location.href = "#project";
        });

    // LinkedIn
    document.querySelector(".linkedin-link")
        .addEventListener("click", () => {
            location.href = "https://www.linkedin.com/in/rahulshelke981/";
        });

    // GitHub
    document.querySelector(".github-link")
        .addEventListener("click", () => {
            location.href = "https://github.com/Rahul-404";
        });
}
