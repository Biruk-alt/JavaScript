"use strict";

const openAccountBtn = document.querySelector(".open-acc");
const invisibleNote = document.querySelector(".open-account");
const overlay = document.querySelector(".bg");
const closeBtn = document.querySelector(".close-btn");
const loginBtn = document.querySelector(".login-btn");
const openAccountLogin = document.querySelectorAll(".open-button");
const header = document.querySelector(".home-page");

openAccountLogin.forEach(btn => btn.addEventListener("click", function () {
    invisibleNote.classList.remove("hidden");
}))

overlay.addEventListener("click", function () {
    invisibleNote.classList.add("hidden");
})

closeBtn.addEventListener("click", function () {
    invisibleNote.classList.add("hidden");
})

const message = document.createElement("div");
message.innerHTML = "we use cookies for improved functionality and analytics. <button class='got-it'>Got it!</button>";
message.classList.add("cookie-message");

header.after(message);

document.querySelector(".got-it").addEventListener("click", function () {
    message.remove();
})

message.style.backgroundColor = "#37383d";
message.style.color = "white";

console.log(getComputedStyle(message).height);
message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + "px";
console.log(getComputedStyle(message).height);



// attribute
const logo = document.querySelector(".logo");
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);
console.log(logo.getAttribute("src"));
logo.setAttribute("designer", "Biruk");
console.log(logo.getAttribute("designer"));