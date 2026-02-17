const ham = document.querySelector("#ham-btn");
const nav = document.querySelector(".nav-bar");
const head = document.querySelector("#head");
const staff = document.querySelector("#staff");

ham.addEventListener("click", () => {
    ham.classList.toggle("show");
    nav.classList.toggle("show");
    head.classList.toggle("show");
});

const display = (info) => {
    staff.innerHTML = "";
    info.forEach(element => {
        const div = document.createElement("div");
        const img = document.createElement("img");
        const h3 = document.createElement("h3");
        const paragraph = document.createElement("p");

        h3.textContent = `${element.name}`;
        img.setAttribute("src", element.image || "");
        img.setAttribute("alt", element.alt || "");
        if (element.width) img.setAttribute("width", element.width);
        if (element.height) img.setAttribute("height", element.height);
        paragraph.textContent = `${element.bio}`;

        div.appendChild(h3);
        div.appendChild(img);
        div.appendChild(paragraph);

        staff.appendChild(div);
    });

};
async function getData() {
    const response = await fetch("data/employees.json");
    const data = await response.json();
    console.table(data.employees);
    display(data.employees);
};
getData();

const last = document.querySelector("#last");

document.addEventListener("DOMContentLoaded", () => {
    try {
        if (!last) return;
        last.innerHTML = "";
        const now = Date.now();
        const lastVisit = localStorage.getItem('lastVisit');
        if (!lastVisit) {
            last.innerHTML = "Welcome ";
        } else {
            // AI helped me come up with this equation.
            const delta = now - parseInt(lastVisit, 10);
            const days = Math.floor(delta / (1000 * 60 * 60 * 24));
            if (delta < 1000 * 60 * 60 * 24) {
                last.innerHTML = 'Back so soon! Awesome!';
            } else {
                last.innerHTML = `You last visited ${days} ${days === 1 ? 'day' : 'days'} ago.`;
            }
        }
        localStorage.setItem('lastVisit', now.toString());
    } catch (err) {
        console.warn('localStorage not available:', err);
    }

})


