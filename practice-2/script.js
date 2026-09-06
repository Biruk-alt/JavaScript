
"use strict";

const buttonOpen = document.querySelector(`.open-button`);
const openAccount = document.querySelector(`.open-account`);
const overlay = document.querySelector(`.bg`);
const closeBtn = document.querySelector(`.close-btn`);
const nav = document.querySelector(`.nav`);
const listLinks = document.querySelectorAll(`.link`);
const section1 = document.querySelector(`#section-1`);
const homePage = document.querySelector(`.home-page`);
const sections = document.querySelectorAll(`.section`);
const targetImages = document.querySelectorAll(`.lazy-img`);
const tabsBox = document.querySelector(`.container__tabs`);
const tabs =  document.querySelectorAll(`.operations__btn`);
const contents = document.querySelectorAll(`.container__contents`)

// open hidden account section
buttonOpen.addEventListener(`click`, function(e) {
    e.preventDefault();
    openAccount.classList.remove(`hidden`)
})

closeBtn.addEventListener(`click`, function(e) {
    e.preventDefault();
    openAccount.classList.add(`hidden`)
})

overlay.addEventListener(`click`, function(e) {
    e.preventDefault();
    openAccount.classList.add(`hidden`)
})


// adding the opacity effect when hover
nav.addEventListener(`mouseover`, function(e) {
    if(e.target.classList.contains(`link`)) {
        const logo = document.querySelector(`.logo`);
        const link = e.target;
        listLinks.forEach(function(list) {
            if(list !== link) {
                list.style.opacity = 0.5;
                logo.style.opacity = 0.5;
            }
        })
    }
});

nav.addEventListener(`mouseout`, function(e) {
    if(e.target.classList.contains(`link`)) {
        const logo = document.querySelector(`.logo`);
        const link = e.target;
        listLinks.forEach(function(list) {
            if(list !== link) {
                list.style.opacity = 1;
                logo.style.opacity = 1;
            }
        })
    }
})


// working with the sticky bar
nav.classList.remove(`sticky`)
const stickyNav = function(entries) {
    if(!entries[0].isIntersecting) nav.classList.add(`sticky`)
}

const headerObserver = new IntersectionObserver(stickyNav,{root: null, threshold: 0, rootMargin: `-90px`});
headerObserver.observe(homePage)


// revealing on scroll
sections.forEach(function(section) {
    section.classList.add(`scroll`)
})

const scrollEff = function(entries) {
    if(entries[0].isIntersecting) entries[0].target.classList.remove(`scroll`)
}

const sectionObserver = new IntersectionObserver(scrollEff,{root: null, threshold: 0.15})
sections.forEach(function(section) {
    sectionObserver.observe(section);
})


// lazy loading images
const revealImg = function(entries) {
    if(entries[0].isIntersecting) {
        entries[0].target.src =  entries[0].target.dataset.src;
        entries[0].target.addEventListener(`load`, function() {
            entries[0].target.classList.remove(`lazy-img`)
        })
    }
    imgObserver.unobserve(entries[0])
}

const imgObserver = new IntersectionObserver(revealImg, {root: null, threshold: 0.5, rootMargin: `400px`})
targetImages.forEach(function(img) {
    imgObserver.observe(img)
})


// operations page tabs
tabsBox.addEventListener(`click`, function(e) {
    if(e.target.classList.contains(`operations__btn`)) {
        const tab = e.target;
        tabs.forEach(function(t) {
            t.classList.remove(`operations__btn--active`)
        })
        tab.classList.add(`operations__btn--active`)
        console.log(tab.dataset.tab)
        contents.forEach(function(content) {
             content.classList.remove(`container__contents--active`)
        })
        document.querySelector(`.container__contents--${tab.dataset.tab}`).classList.add(`container__contents--active`)
    }
})


