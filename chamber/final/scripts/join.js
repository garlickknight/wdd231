const ham = document.querySelector("#ham-btn");
const nav = document.querySelector(".nav-bar");
const head = document.querySelector("#head");

ham.addEventListener("click", () => {
    ham.classList.toggle("show");
    nav.classList.toggle("show");
    head.classList.toggle("show");
});