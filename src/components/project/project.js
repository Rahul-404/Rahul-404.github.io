import { generateInfo, generateStack, generateDesign, generateImpact } from "./generators.js";

// =========================
// 🔥 GLOBAL CONFIG
// =========================
const ENABLED_KEYS = [
  "ml",     // machine learning
  "de",     // data engineering
  // "nlp",    // natural language processing
  // "dl",     // deep learning
  // "genai",  // generative ai
  "da",     // data analytics
  // "cv",     // computer vision
  // "ts",     // time series
  // "dsa",    // DSA & ML algorithms
  // "mlops"   // ML Ops
];

const DATA_FOLDER = "../src/components/project/data/";

let badges = null;   // global cache

export async function loadBadges() {
    if (!badges) {
        const data = await fetch(DATA_FOLDER + "badges.json").then(res => res.json());
        
        // badges.json is array → convert to simple object:
        // badges.front, badges.back
        badges = {
            front: data[0].front,
            back: data[1].back
        };
    }
    return badges;
}

/*-----------------*/
/* Flip Card Logic */
/*-----------------*/
// export let currentlyFlippedId = null;

// export function flipCard(id) {
//   const clickedCard = document.getElementById(`card-${id}`);

//   // If another card is flipped, unflip it
//   if (currentlyFlippedId && currentlyFlippedId !== id) {
//     const previousCard = document.getElementById(`card-${currentlyFlippedId}`);
//     previousCard.classList.remove('flipped');
//   }

//   // Toggle the current card
//   clickedCard.classList.toggle('flipped');

//   // Update currently flipped card
//   if (clickedCard.classList.contains('flipped')) {
//     currentlyFlippedId = id;
//   } else {
//     currentlyFlippedId = null;
//   }
// }


export function initProjectSection() {

  // load project categories & add click event to tabs
  initProjectTabs();
  // VERY IMPORTANT → Call this AFTER you load project cards into the DOM
  // initCarousels();


  console.log("Project Section initialized");

}

export async function initProjectTabs() {

  // ⬅️ load badges FIRST
  await loadBadges();  

  const DATA_FOLDER = "../src/components/project/data/";
  const tabsContainer = document.getElementById("project-tabs");

  const categories = await fetch(DATA_FOLDER + "categories.json")
      .then(res => res.json());

  tabsContainer.innerHTML = "";

  ENABLED_KEYS.forEach((key, index) => {

    const value = categories[key];
    if (!value) return;

    const [displayName, jsonFile] = value;

    const li = document.createElement("li");
    const a = document.createElement("a");

    a.textContent = displayName;
    a.dataset.category = key;
    a.dataset.file = jsonFile;

    if (index === 0) a.classList.add("active");

    // Attach click handler
    a.addEventListener("click", () => onTabClick(a));

    li.appendChild(a);
    tabsContainer.appendChild(li);
  });

  console.log("Tabs loaded dynamically in ENABLED_KEYS order!");

  // Auto load FIRST TAB after UI is ready
  const firstTab = tabsContainer.querySelector("a");
  if (firstTab) onTabClick(firstTab);
}

function onTabClick(tab) {
  // reset card flipped variable
  currentlyFlippedId = null

  const allTabs = document.querySelectorAll("#project-tabs a");

  // Remove "active" from all tabs
  allTabs.forEach(t => t.classList.remove("active"));

  // Add "active" to clicked tab
  tab.classList.add("active");

  // Get linked JSON file
  const fileName = tab.dataset.file;

  console.log("Selected category JSON:", fileName);

  // Load project cards for that category
  loadProjectsForCategory(fileName);
}

export async function loadProjectsForCategory(fileName) {
  const DATA_FOLDER = "../src/components/project/data/";
  const container = document.getElementById("project-card");

  const data = await fetch(DATA_FOLDER + fileName).then(res => res.json());

  console.log(data);

  // Clear existing cards
  container.innerHTML = "";

  // Create card elements
  data.forEach(project => {
    const card = createProjectCard(project);
    container.appendChild(card);
  });

  // Rebind flips for newly created cards
  attachFlipEvents();

  console.log("Loaded projects for:", fileName);
}

function attachFlipEvents() {

  // TAB CLICK HANDLERS
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {

      const tabsWrapper = btn.closest(".tabs");

      // remove active from all buttons
      tabsWrapper.querySelectorAll(".tab-btn").forEach(b =>
        b.classList.remove("active")
      );
      btn.classList.add("active");

      // match clicked tab content
      const selected = btn.dataset.tab;

      tabsWrapper.querySelectorAll(".tab-content").forEach(content => {
        content.style.display =
          content.dataset.tab === selected ? "block" : "none";
      });
    });
  });
}

//------------------- here card is getting built ---------------------

/*----------------*/
/* Card Generator */
/*----------------*/
export function createProjectCard(p) {
  return htmlToElement(`
    <div class="card-container" data-id="${p.project_id}">

      <div class="card" id="card-${p.project_id}">

        <div class="card-side card-front">

          <img src="${p.project_image}" class="project-img">

          <h2 class="experience-sub-title project-title">${p.title}</h2>

          <p>
          ${generateFrontBadgeHTML(p.tags)}
          </p>

          ${generateFrontButtons(p)}
        </div>

        <div class="card-side card-back">
          ${generateTabsHTML(p)}

          ${generateBackButtons(p)}
        </div>

      </div>
    </div>
  `);
}

function htmlToElement(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstChild;
}

// -------------------------------
// Helper function to generate badge HTML
// -------------------------------
export function generateFrontBadgeHTML(tagKeys) {
  // if (!badges || !badges.front) return "";
  console.log('tags: ' + tagKeys);

  return tagKeys
    .map(key => badges.front[key] ? `<img src="${badges.front[key]}" alt="${key}" class="badge-img">` : "")
    .join(" ");
}

/*--------------------------------*/
/* Card's Front Buttons Generator */
/*--------------------------------*/
function generateFrontButtons(p) {

  const { demo, blog, docs, dagshub } = p.links;

  if (p.links.demo === null && p.links.blog === null) {
    return `
    <div class="two-btn-container">
      <button class="btn-2 github-btn-color"
          onclick="location.href='${p.links.github}'">Github</button>

      <button class="btn-2 flip-btn-color project-btn" onclick="flipCard(${p.project_id})">Flip</button>
    </div>
  `;
  }
  if (p.links.demo != null) {
    return `
    <div class="three-btn-container">
      <button class="btn-3 github-btn-color"
          onclick="location.href='${p.links.github}'">Github</button>

      <button class="btn-3 demo-btn-color"
          onclick="location.href='${p.links.demo}'">Demo</button>

      <button class="btn-3 flip-btn-color project-btn" onclick="flipCard(${p.project_id})">Flip</button>
    </div>
  `;
  } else if (p.links.demo === null && p.links.blog != null) {
    return `
    <div class="three-btn-container">
      <button class="btn-3 github-btn-color"
          onclick="location.href='${p.links.github}'">Github</button>

      <button class="btn-3 front-blog-btn-color"
          onclick="location.href='${p.links.blog}'">Blog</button>

      <button class="btn-3 flip-btn-color project-btn" onclick="flipCard(${p.project_id})">Flip</button>
    </div>
    `;
  }
}

/*-------------------------------*/
/* Card's Back Buttons Generator */
/*-------------------------------*/
function generateBackButtons(p) {
  const { demo, blog, docs, dagshub } = p.links;

  // PRIORITY GROUPS
  const groupA = ["demo", "blog"];      // demo > blog
  const groupB = ["docs", "dagshub"];   // docs > dagshub

  const itemsPresent = {
    demo,
    blog,
    docs,
    dagshub
  };

  // Determine FRONT (same logic you used earlier)
  let front = null;
  for (const key of groupA) {
    if (itemsPresent[key]) {
      front = key;
      break;
    }
  }

  // BACK candidates
  let backList = [];

  // 1. SECONDARY FROM GROUP A
  const remainingA = groupA.filter(x => x !== front && itemsPresent[x]);
  if (remainingA.length > 0) {
    backList.push(remainingA[0]);   // e.g., blog when demo is front
  }

  // 2. GROUP B candidates in priority order
  for (const key of groupB) {
    if (itemsPresent[key]) backList.push(key);
  }

  // Build buttons (limit to 2 slots)
  const finalBackItems = backList.slice(0, 2);

  // Determine container based on count
  let containerClass =
    finalBackItems.length === 2 ? "three-btn-container" :
    finalBackItems.length === 1 ? "two-btn-container" :
    "home-btn-container";

  console.log(p.project_id + '] finalBackItems.length : '+ finalBackItems.length);

  // Helper to generate button HTML
  const buttonHTML = (type, url) => {
    const classes = {
      demo: "demo-btn-color",
      blog: "back-blog-btn-color",
      docs: "docs-btn-color",
      dagshub: "model-btn-color"
    }[type];

    const label = {
      demo: "Demo",
      blog: "Blog",
      docs: "Docs",
      dagshub: "DagsHub"
    }[type];

    return `<button class="btn-${finalBackItems.length + 1} ${classes}" onclick="location.href='${url}'">${label}</button>`;
  };

  // Build HTML for the selected back items
  let buttons = "";
  for (const key of finalBackItems) {
    buttons += buttonHTML(key, itemsPresent[key]);
  }

  // Add flip-back button ALWAYS
  buttons += `
    <button class="btn-${finalBackItems.length + 1} flip-btn-color" onclick="flipCard(${p.project_id})">
      Flip Back
    </button>
  `;

  return `
    <div class="${containerClass}">
      ${buttons}
    </div>
  `;
}


//------------------- card helper functions ---------------------

/*-----------------------------------*/
/* Card's Back Tab Buttons Generator */
/*-----------------------------------*/
function generateTabsHTML(p) {
  const hasStack  = p.stack  && Object.keys(p.stack).length > 0;
  const hasDesign = p.design && p.design.length > 0;
  const hasImpact = p.impact;

  console.log('hasImpact : ' + hasImpact)

  return `
  <div class="tabs">

      <div class="tab-buttons">
        <button class="tab-btn active" data-tab="info-${p.project_id}">Info</button>

        ${ hasStack  ? `<button class="tab-btn" data-tab="stack-${p.project_id}">Stack</button>` : "" }
        ${ hasDesign ? `<button class="tab-btn" data-tab="design-${p.project_id}">Design</button>` : "" }
        ${ hasImpact ? `<button class="tab-btn" data-tab="impact-${p.project_id}">Impact</button>` : "" }
      </div>
      
      <div class="tab-contents">
        ${generateInfo(p)}
        ${hasStack  ? generateStack(p, badges.back)   : ""}
        ${hasDesign ? generateDesign(p) : ""}
        ${hasImpact ? generateImpact(p) : ""}
      </div>
    </div>
  `;
}

