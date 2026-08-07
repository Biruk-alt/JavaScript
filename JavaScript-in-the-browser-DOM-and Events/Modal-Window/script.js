
"use strict";

const btnsOpenModal = document.querySelectorAll(".show-modal");
const overlay = document.querySelector(".overlay");
const close = document.querySelector(".close-modal");
const modal = document.querySelector(".modal");


const removeHidden = function() {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

const addHidden = function() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

for (let i=0; i < btnsOpenModal.length; i++) {
    btnsOpenModal[i].addEventListener("click", removeHidden)
   
}

close.addEventListener("click", addHidden);

overlay.addEventListener("click", addHidden);

document.addEventListener("keydown", function(e) {
    console.log(e.key);
    if (e.key==="Escape" && !modal.classList.contains("hidden")) {
        addHidden();
    }
})