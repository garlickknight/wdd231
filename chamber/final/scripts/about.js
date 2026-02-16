const ham = document.querySelector("#ham-btn");
const nav = document.querySelector(".nav-bar");
const head = document.querySelector("#head");
const treatments = document.querySelector("#treatments");
const fathers = document.querySelector("fathers");

ham.addEventListener("click", () => {
    ham.classList.toggle("show");
    nav.classList.toggle("show");
    head.classList.toggle("show");
});



const display = (info) => {
    treatments.innerHTML = "";
    info.forEach(treatment => {
        const div = document.createElement("div");
        const img = document.createElement("img");
        const h3 = document.createElement("h2");
        const paragraph = document.createElement("p");
        const li = document.createElement("li");
        const litwo = document.createElement("li");
        const lithree = document.createElement("li");
        const lifour = document.createElement("li");
        const ul = document.createElement("ul");

        h3.textContent = `${treatment.id}`;
        img.setAttribute("src", treatment.image || "");
        img.setAttribute("alt", treatment.alt || "");
        paragraph.textContent = `${treatment.description}`;
    
        li.textContent = `${treatment.details ? treatment.details[0] : ""}`;
        litwo.textContent = `${treatment.details ? treatment.details[1] : ""}`;
        lithree.textContent = `${treatment.details ? treatment.details[2] : ""}`;
        lifour.textContent = `${treatment.details ? treatment.details[3] : ""}`;

        ul.appendChild(li);
        ul.appendChild(litwo);
        ul.appendChild(lithree);
        ul.appendChild(lifour);

        div.appendChild(h3);
        div.appendChild(img);
        div.appendChild(paragraph);
        div.appendChild(ul);

        treatments.appendChild(div);
    });

};
async function getData() {
    const response = await fetch("data/about.json");
    const data = await response.json();
    console.table(data.treatments);
    display(data.treatments);
};
const fatherDesplay = (info) => {
    fathers.innerHTML = "";
    info.forEach(treatment => {
        const div = document.createElement("div");
        const img = document.createElement("img");
        const h3 = document.createElement("h2");
        const paragraph = document.createElement("p");
        const li = document.createElement("li");
        const litwo = document.createElement("li");
        const lithree = document.createElement("li");
        const lifour = document.createElement("li");
        const ul = document.createElement("ul");

        h3.textContent = `${treatment.title}`;
        img.setAttribute("src", treatment.image || "");
        img.setAttribute("alt", treatment.alt || "");
        paragraph.textContent = `${treatment.description}`;
        li.textContent = `${treatment.details ? treatment.details[0] : ""}`;
        litwo.textContent = `${treatment.details ? treatment.details[1] : ""}`;
        lithree.textContent = `${treatment.details ? treatment.details[2] : ""}`;
        lifour.textContent = `${treatment.details ? treatment.details[3] : ""}`;

        ul.appendChild(li);
        ul.appendChild(litwo);
        ul.appendChild(lithree);
        ul.appendChild(lifour);

        div.appendChild(h3);
        div.appendChild(img);
        div.appendChild(paragraph);
        div.appendChild(ul);

        treatments.appendChild(div);
    });

};



// async function get() {
//     const response = await fetch("data/fathers.json");
//     const data = await response.json();
//     console.table(data.fathers);
//     display(data.fathers);
// };
getData();
// get();
