const ham = document.querySelector("#ham-btn");
const nav = document.querySelector(".nav-bar");
const head = document.querySelector("#head");

ham.addEventListener("click", () => {
    ham.classList.toggle("show");
    nav.classList.toggle("show");
    head.classList.toggle("show");
});

var date = new Date();
var year = date.getFullYear();
document.getElementById("currentyear").innerHTML = year;
document.getElementById("lastModified").innerHTML = document.lastModified;