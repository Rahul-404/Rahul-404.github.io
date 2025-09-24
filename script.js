// drop down menu button : more
document.addEventListener("DOMContentLoaded", function () {

    // variables for desktop navigattion drop down
    const dropdownParent = document.querySelector(".dropdown-parent");
    const toggleButton = dropdownParent.querySelector(".dropdown-toggle");

    // variables for hamburger menu
    const hamMenu = document.querySelector(".ham-menu");
    const slideMenu = document.querySelector(".slide");

    // navigation drop down open
    toggleButton.addEventListener("click", function (e) {
        e.stopPropagation();
        dropdownParent.classList.toggle("open");
    });

    // navigation drop down close
    document.addEventListener("click", function (e) {
        if (!dropdownParent.contains(e.target)) {
        dropdownParent.classList.remove("open");
        }
    });

    // Event listner for hamburger menu
    hamMenu.addEventListener('click', function (e) {
        hamMenu.classList.toggle('active');
        slideMenu.classList.toggle('active');
    });


});


// project categories scrollbar 

const tabs = document.querySelectorAll(".scrollable-tabs-container a");
// const rightArrow = document.querySelector(".scrollable-tabs-container .right-arrow svg");
// const leftArrow = document.querySelector(".scrollable-tabs-container .left-arrow svg");

const tabsList = document.querySelector(".scrollable-tabs-container ul");

const leftArrowContainer = document.querySelector(".scrollable-tabs-container .left-arrow");
const rightArrowContainer = document.querySelector(".scrollable-tabs-container .right-arrow");


const removeActiveClass = () => {
    tabs.forEach(tab => {
        tab.classList.remove("active");
    })
}

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        removeActiveClass();
        tab.classList.add("active");
    })
})

const manageIcons = () => {
    if (tabsList.scrollLeft >= 20) {
        leftArrowContainer.classList.add("active");
    }
    else {
        leftArrowContainer.classList.remove("active");
    }

    let maxScrollValue = tabsList.scrollWidth - tabsList.clientWidth - 20;
    console.log("scroll width: ", tabsList.scrollWidth);
    console.log("client width: ", tabsList.clientWidth);

    if (tabsList.scrollLeft >= maxScrollValue) {
        rightArrowContainer.classList.remove("active");
    }
    else {
        rightArrowContainer.classList.add("active");
    }
};

// rightArrow.addEventListener("click", () => {
//     tabsList.scrollLeft += 200;
//     manageIcons();
// });

// leftArrow.addEventListener("click", () => {
//     tabsList.scrollLeft -= 200;
//     manageIcons();
// });

// tabsList.addEventListener("scroll", manageIcons);

// project categories 

// const tabs = document.querySelectorAll('.tab_btn');
const all_content = document.querySelectorAll('.project-content');

tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
        tabs.forEach(tab=>{tab.classList.remove('active')});
        tab.classList.add('active');

        all_content.forEach(content => {
            content.classList.remove('active');
        });

        all_content[index].classList.add('active');

    })

});

// to flip cards
let currentlyFlippedId = null;

function flipCard(id) {
  const clickedCard = document.getElementById(`card-${id}`);

  // If another card is flipped, unflip it
  if (currentlyFlippedId && currentlyFlippedId !== id) {
    const previousCard = document.getElementById(`card-${currentlyFlippedId}`);
    previousCard.classList.remove('flipped');
  }

  // Toggle the current card
  clickedCard.classList.toggle('flipped');

  // Update currently flipped card
  if (clickedCard.classList.contains('flipped')) {
    currentlyFlippedId = id;
  } else {
    currentlyFlippedId = null;
  }
}