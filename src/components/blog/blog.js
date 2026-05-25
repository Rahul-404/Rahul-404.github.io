const blogs = [
  {
    title: "Deploying FastAPI ML Models on AWS with Jenkins CI/CD",
    description:
      "Learn how to automate ML deployments using Docker, Jenkins, ECR, EC2, and GitHub Actions.",
    image: "./assets/blog/aws-mlops.jpg",
    tags: ["MLOps", "AWS"],
    category: "mlops",
    date: "May 2026",
    readTime: "8 min read",
    link: "#",
  },

  {
    title: "Production Monitoring for ML Systems",
    description:
      "Prometheus, Grafana, Loki, alerting systems, drift detection, and retraining workflows.",
    image: "./assets/blog/monitoring.jpg",
    tags: ["Monitoring", "MLOps"],
    category: "mlops",
    date: "April 2026",
    readTime: "10 min read",
    link: "#",
  },
];

export function initBlogSection() {
  const blogsContainer = document.getElementById("blogs-container");

  if (!blogsContainer) return;

  renderBlogs("all");

  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      renderBlogs(filter);
    });
  });

  function renderBlogs(filter) {
    blogsContainer.innerHTML = "";

    const filteredBlogs =
      filter === "all"
        ? blogs
        : blogs.filter((blog) => blog.category === filter);

    filteredBlogs.forEach((blog) => {
      const card = document.createElement("div");

      card.className = "blog-card";

      card.innerHTML = `
        <img src="${blog.image}" alt="${blog.title}" class="blog-image" />

        <div class="blog-content">

          <div class="blog-tags">
            ${blog.tags
              .map((tag) => `<span class="blog-tag">${tag}</span>`)
              .join("")}
          </div>

          <h3 class="blog-title">${blog.title}</h3>

          <p class="blog-description">
            ${blog.description}
          </p>

          <div class="blog-meta">
            <span class="blog-date">${blog.date}</span>
            <span class="blog-read">${blog.readTime}</span>
          </div>

          <a href="${blog.link}" target="_blank"
             class="btn btn-color-2 read-btn">
             Read Blog
          </a>

        </div>
      `;

      blogsContainer.appendChild(card);
    });
  }
}