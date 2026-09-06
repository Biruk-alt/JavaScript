"use strict";

const openAccountBtn = document.querySelector(".open-acc");
const invisibleNote = document.querySelector(".open-account");
const overlay = document.querySelector(".bg");
const closeBtn = document.querySelector(".close-btn");
const loginBtn = document.querySelector(".login-btn");
const openAccountLogin = document.querySelectorAll(".open-button");
const header = document.querySelector(".home-page");
const section1 = document.querySelector(".features-page");
const learnMoreBtn = document.querySelector(".learn-more");
const h1 = document.querySelector("h1");
const tabs = document.querySelectorAll(".operations__btn");
const tabsBox = document.querySelector(".container__tabs");
const contents = document.querySelectorAll(".container__contents");
const nav = document.querySelector(`.nav`);
const links = document.querySelectorAll(`.link`);
const logo = document.querySelector(`.logo`);
const sections = document.querySelectorAll(`.section`);
const imgTargets =  document.querySelectorAll(`.lazy-img`);
const slideImges = document.querySelectorAll(`.slide-img`);
const rightBtn = document.querySelector(`.right-btn`);
const leftBtn = document.querySelector(`.left-btn`);
const dotContainer = document.querySelector(`.dots`); 
const dots = document.querySelectorAll(`.dot-btn`);
const slides = document.querySelectorAll(`.slide`);

openAccountLogin.forEach((btn) =>
  btn.addEventListener("click", function () {
    invisibleNote.classList.remove("hidden");
  }),
);

overlay.addEventListener("click", function () {
  invisibleNote.classList.add("hidden");
});

closeBtn.addEventListener("click", function () {
  invisibleNote.classList.add("hidden");
});

learnMoreBtn.addEventListener("click", function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: "smooth" });
  console.log("clicked");
});

tabsBox.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".operations__btn");

  tabs.forEach(function (tab) {
    tab.classList.remove("operations__btn--active");
  });
  clicked.classList.add("operations__btn--active");

  contents.forEach(function (content) {
    content.classList.remove("container__contents--active");
  });
  document
    .querySelector(`.container__contents--${clicked.dataset.tab}`)
    .classList.add("container__contents--active");
});

const handleHover = function (e, opacity) {
  if (e.target.classList.contains("link")) {
    const link = e.target;
    const siblings = [...link.parentElement.children];
    siblings.forEach(function (sib) {
      if (sib !== link) {
        sib.style.opacity = opacity;
      }
      logo.style.opacity = opacity;
    });
  }
};

nav.addEventListener("mouseover", function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener("mouseout", function (e) {
  handleHover(e, 1);
});


// stickyNav 

const navHeight = nav.getBoundingClientRect().height
console.log(navHeight);
const stickyNav = function(entries) {
  console.log(entries[0])
  if(!entries[0].isIntersecting) {
    nav.classList.add("sticky");
  }
}
const options = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
}

const headerObserver = new IntersectionObserver(stickyNav, options)
headerObserver.observe(document.querySelector(".home-page"))


// Revealing on scroll
// on practice 1

// Loading lazy images
const lazyImg = function(entries) {
  console.log(entries[0]);
  if(!entries[0].isIntersecting) return;

  entries[0].target.src = entries[0].target.dataset.src;
  entries[0].target.addEventListener("load", function(e) {
    entries[0].target.classList.remove("lazy-img")
    
  })
}

const imgObserver = new IntersectionObserver(lazyImg, {root: null, threshold: 0, rootMargin: `200px`}) 
imgTargets.forEach(function(img) {
  imgObserver.observe(img);
})



//Sliding images
let curSlide = 0;
let maxSlide = slides.length;

slides.forEach(function(slide, i) {
  slide.style.transform = `translateX(${100 * i}%)`
})


const nextSlide = function() {
  if(curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  slides.forEach(function(slide, i) {
    slide.style.transform = `translateX(${100 * (i - curSlide)}%)`
  })
  slides.forEach(function(slide) {
    slide.classList.remove(`slide-active`)
  })
  slides[curSlide].classList.add(`slide-active`);
}

const prevSlide = function() {
   if(curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  console.log(curSlide);
  slides.forEach(function(slide, i) {
  slide.style.transform = `translateX(${100 * (i - curSlide)}%)`
})
  slides.forEach(function(slide) {
    slide.classList.remove(`slide-active`)
  })
  slides[curSlide].classList.add(`slide-active`);
}

rightBtn.addEventListener(`click`, nextSlide)
leftBtn.addEventListener(`click`, prevSlide)

document.addEventListener(`keydown`, function(e) {
  if(e.key === `ArrowRight`) {
    nextSlide()
  }
})

document.addEventListener(`keydown`, function(e) {
  if(e.key === `ArrowLeft`) {
    prevSlide()
  }
})


// sliding dots
slides.forEach(function(_, i) {
  dotContainer.insertAdjacentHTML(`beforeend`, `<button class="slide-dot" data-slide="${i}">`)
})

dotContainer.addEventListener(`click`, function(e) {
  if(e.target.classList.contains(`slide-dot`)) {
    const clicked = Number(e.target.dataset.slide);
    curSlide = Number(clicked);
    slides.forEach(function(slide) {
      slide.classList.remove(`slide-active`)
    })
    document.querySelector(`.slide-${clicked + 1}`).classList.add(`slide-active`)
    slides.forEach(function(slide, i) {
      slide.style.transform = `translateX(${100 * (i - curSlide)}%)`
    })
  }
})


// reveal on scroll
sections.forEach(function(sec) {
  sec.classList.add(`section--hidden`)
})

const reveal = function(entries) {
  console.log(entries[0])
  if(entries[0].isIntersecting) {
    entries[0].target.classList.remove(`section--hidden`)
  }
}

const sectionObserver = new IntersectionObserver(reveal, {root: null, threshold: 0.15})

sections.forEach(function(section) {
  sectionObserver.observe(section)
})


// DOM events
window.addEventListener(`beforeunload`, function(e) {
  e.preventDefault();
  e.returnValue = "";
})


































// // sliding images


// slideImges.forEach(function(img, i) {
//   img.style.transform = `translateX(${100 * i}%)`
// })

// let curSlide = 0;
// let maxSlide = slideImges.length;

// const slide = function(curSlide) {
//    slideImges.forEach(function(img, i) {
//     img.style.transform = `translateX(${100 * (i - curSlide)}%)`;
//   })
// }

// const nextSlide = function() {
//   if(curSlide === maxSlide - 1) {
//     curSlide = 0;
//   } else {
//     curSlide++;
//   }
//   slide(curSlide);
//   activateDots(curSlide);
// }

// const prevSlide = function() {
//   if(curSlide === 0) {
//     curSlide = maxSlide - 1;
//   } else {
//     curSlide--;
//   }
//   slide(curSlide);
//   activateDots(curSlide);
// }

// rightBtn.addEventListener(`click`, nextSlide)
// leftBtn.addEventListener(`click`, prevSlide)

// document.addEventListener(`keydown`, function(e) {
//   if(e.key === `ArrowLeft`) prevSlide();
//   if(e.key === `ArrowRight`) nextSlide();
// })

// // dot slides 
// const createDots = function() {
//   slideImges.forEach(function(_, i) {
//     dotContainer.insertAdjacentHTML(`beforeend`, `<button class="dot-btn" data-slide="${i}"><button>`)
//   })
// }

// createDots();

// const activateDots = function(slide) {
//   document.querySelectorAll(`.dot-btn`).forEach(function(btn) {
//     btn.classList.remove(`dot-btn-active`);
//   })
//   document.querySelector(`.dot-btn[data-slide="${slide}"]`).classList.add(`dot-btn-active`)
// }

// activateDots(0);

// dotContainer.addEventListener(`click`, function(e) {
//   if(e.target.classList.contains(`dot-btn`)) {
//     slide(e.target.dataset.slide);
//     activateDots(e.target.dataset.slide);
//   }
// })






















// const createDots = function() {
//   slideImges.forEach(function(_, i) {
//     dotContainer.insertAdjacentHTML(`beforeend`, `<button class="dot-btn" data-slide="${i}">`)
//   })
// }

// createDots();

// const activateDot = function(slide) {
//   document.querySelectorAll(`.dot-btn`).forEach(function(dot) {
//     dot.classList.remove(`dot-btn-active`)
//   })

//   document.querySelector(`.dot-btn[data-slide="${slide}"]`).classList.add(`dot-btn-active`);
// }

// activateDot(0)

// dotContainer.addEventListener(`click`, function(e) {
//   if(e.target.classList.contains(`dot-btn`)) {
//     e.target.classList.add(`dot-btn-active`);
//     const curSlide = Number(e.target.dataset.slide);
//     slide(curSlide);
//   }
//   activateDot(e.target.dataset.slide);
// })



























