// Hamburger button and navigation menu code
// Hamburger btn selector
const navbutton = document.querySelector("#ham-btn");
// navigation bar selector 
const navBar = document.querySelector("#nav-bar");
// event listener to make the navigation bar work.
navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navBar.classList.toggle("show")
});

const card = document.getElementById("cards");






async function getData() {
    const response = await fetch("data/members.json"); // request
    console.log(response); // temp output test of data response 
}

getData();