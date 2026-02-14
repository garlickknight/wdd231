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

