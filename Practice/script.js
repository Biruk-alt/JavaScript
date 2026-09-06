'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll(`.operations__tab`);
const tabsBox = document.querySelector(`.operations__tab-container`);
const currentContent = document.querySelector(`.operations__content`);
const sections = document.querySelectorAll(`.section`);

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

tabsBox.addEventListener("click", function(e) {
  e.preventDefault();
  const clicked = e.target.closest(".operations__tab")
  tabs.forEach(function(tab) {
    tab.classList.remove("operations__tab--active");
  })
  clicked.classList.add("operations__tab--active");
  document.querySelectorAll(`.operations__content`).forEach(function(content) {
    content.classList.remove("operations__content--active")
  })
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active")
})


// revealing on scroll
sections.forEach(function(sec) {
  sec.classList.add("section--hidden")
})
const reveal = function(entries) {
  entries.forEach(function(entry) {

    if(entry.isIntersecting) {
      entry.target.classList.remove("section--hidden");
      sectionObserver.unobserve(entries[0].target)
    }
  })
}

const sectionObserver = new IntersectionObserver(reveal,{root: null, threshold: 0.15} )
sections.forEach(function(section) {
  sectionObserver.observe(section);
})