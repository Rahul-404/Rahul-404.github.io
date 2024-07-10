function toggleMenu(){
    const menu=document.querySelector(".menu-links");
    const icon=document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

document.addEventListener('DOMContentLoaded', (event) => {
    const recommendBoxes = document.querySelectorAll('.open-link');

    recommendBoxes.forEach(box => {
      box.addEventListener('click', () => {
        const link = box.getAttribute('data-link');
        if (link) {
        //   window.location.href = link;
          window.open(link, '_blank');
        }
      });
    });
  });
