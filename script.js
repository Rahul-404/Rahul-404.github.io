function toggleMenu(){
    const menu=document.querySelector(".menu-links");
    const icon=document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// var typed = new Typed(

// )

// project categories scrollbar 

const tabs = document.querySelectorAll(".scrollable-tabs-container a");
const rightArrow = document.querySelector(".scrollable-tabs-container .right-arrow svg");
const leftArrow = document.querySelector(".scrollable-tabs-container .left-arrow svg");

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

rightArrow.addEventListener("click", () => {
    tabsList.scrollLeft += 200;
    manageIcons();
});

leftArrow.addEventListener("click", () => {
    tabsList.scrollLeft -= 200;
    manageIcons();
});

tabsList.addEventListener("scroll", manageIcons);

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

// document.addEventListener('DOMContentLoaded', (event) => {
//     const recommendBoxes = document.querySelectorAll('.open-link');

//     recommendBoxes.forEach(box => {
//       box.addEventListener('click', () => {
//         const link = box.getAttribute('data-link');
//         if (link) {
//         //   window.location.href = link;
//           window.open(link, '_blank');
//         }
//       });
//     });
//   });
