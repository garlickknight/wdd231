const ham = document.querySelector("#ham-btn");
const nav = document.querySelector(".nav-bar");
const head = document.querySelector("#head");
const treatments = document.querySelector("treatments");

ham.addEventListener("click", () => {
    ham.classList.toggle("show");
    nav.classList.toggle("show");
    head.classList.toggle("show");
});


const display = (info) => {
    treatments.innerHTML = "";
    info.forEach(treatments => {
        const div = document.createElement("div");
        const img = document.createElement("img");
        const h3 = document.createElement("h3");
        const paragraph = document.createElement("p");

        h3.textContent = `${treatments.id}`;
        img.setAttribute("src", treatments.image || "");
        img.setAttribute("alt", treatments.alt || "");
        img.setAttribute("width", treatments.width);
        img.setAttribute("height", treatments.height);
        paragraph.textContent = `${treatments.description}`;

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
