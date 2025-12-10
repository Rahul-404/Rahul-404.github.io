/**
 * Generate the INFO section for a project card.
 * 
 * @param {Object} project - Project data from JSON
 * @returns {string} HTML string
 */
export function generateInfo(project) {
  const inner = Object.entries(project.info)
    .map(([section, items]) => {
      const listItems = items.map(i => `<li>${i}</li>`).join("");

      return `
        <h4>${section}</h4>
        <ul class="info-list">${listItems}</ul>
      `;
    })
    .join("");

  // console.log('generateInfo: ' + inner)

  return `
    <div class="tab-content active" id="info-${project.project_id}">
      ${inner}
    </div>
  `;
}

/**
 * Generate the TECH STACK section (badges).
 * 
 * @param {Object} project - Project data from JSON
 * @returns {string} HTML string
 */
export function generateStack(project, badges) {
  
  let html = "";

  // Loop through top-level stack categories
  Object.entries(project.stack).forEach(([category, items]) => {
    html += `
      <div class="stack-layer">
        <h4>${category}</h4>
        ${items
          .map(item => {
            const badge = badges[item];
            if (!badge) {
              console.warn("Badge missing for:", item);
              return "";
            }
            return `<img src="${badge}" alt="${item}" />`;
          })
          .join("")}
      </div>
    `;
  });

return `
    <div class="tab-content" id="stack-${project.project_id}">
      ${html}
    </div>
  `;
}

/**
 * Generate the DESIGN section (architecture , flow charts).
 * 
 * @param {Object} project - Project data from JSON
 * @returns {string} HTML string
 */
export function generateDesign(project) {
  const designImages = project.design || [];

  if (!Array.isArray(designImages) || designImages.length === 0) {
    return `
      <div class="tab-content" id="design-${project.project_id}">
        <p>No design assets available.</p>
      </div>
    `;
  }

  // Build all <a><img></a> items for the carousel
  const carouselItems = designImages
    .map(img => {
      return `
        <a data-fancybox="design-${project.project_id}" href="${img}">
          <img src="${img}" alt="Design Image" />
        </a>
      `;
    })
    .join("");

  return `
    <div class="tab-content" id="design-${project.project_id}">
      <h4 style="margin-bottom:5px;">Design & Architecture</h4>

      <div class="carousel">
        <button class="design-btn prev">‹</button>

        <div class="carousel-track">
          ${carouselItems}
        </div>

        <button class="design-btn next">›</button>
      </div>
    </div>
  `;
}


/**
 * Generate the IMPACT section (results, metrics, outcomes).
 * 
 * @param {Object} project - Project data from JSON
 * @returns {string} HTML string
 */
export function generateImpact(project) {
  const impactData = project.impact || {};

  function renderSection(title, sectionData) {
    if (!sectionData) return "";

    const points = Array.isArray(sectionData.points)
      ? sectionData.points.map(item => `<li>${item}</li>`).join("")
      : "";

    const imageBlock = sectionData.image
      ? `
        <div class="impact-visual">
          <img src="${sectionData.image}" alt="${title} Visual" class="impact-img" />
        </div>
      `
      : "";

    return `
      <div class="impact-section">
        <h4>${title}</h4>
        ${
          points
            ? `<ul class="impact-list">${points}</ul>`
            : ""
        }
        ${imageBlock}
      </div>
    `;
  }

  return `
    <div class="tab-content" id="impact-${project.project_id}">
      
      ${renderSection("Impact", impactData.Impact)}
      ${renderSection("Performance", impactData.Performance)}
    </div>
  `;
}

