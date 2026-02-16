const ham = document.querySelector("#ham-btn");
const nav = document.querySelector(".nav-bar");
const head = document.querySelector("#head");
const treatments = document.querySelector("#treatments");
const fathers = document.querySelector("#fathers");

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
    console.log("Treatments data:", data.treatments);
    display(data.treatments);
};
const modelBtn = document.querySelector("#model-btn");
const closeBtn = document.createElement("button");
const fatherInfo = document.querySelector("#father-info");
const fatherDesplay = (fatherss) => {
    const holder = document.createElement("dialog");
    const h2 = document.createElement("h1");
    h2.textContent = "Fathers of Physical Therapy:";

    modelBtn.addEventListener('click', () => {
        holder.showModal();
        closeBtn.show();
    });
    closeBtn.addEventListener('click', () => {
        holder.close();
        closeBtn.hide();
    });

    fathers.innerHTML = "";
    fathers.appendChild(h2);
    fatherss.forEach(father => {
        const div = document.createElement("div");
        const h3 = document.createElement("h2");
        const paragraph = document.createElement("p");
        const life = document.createElement("p");
        const country = document.createElement("p");
        const info = document.createElement("div");

        h3.textContent = `${father.name}`;
        div.setAttribute("id", "father-info")
        paragraph.textContent = `${father.description}`;
        life.textContent = `life span: ${father.lifespan}`;
        country.textContent = `Lived in ${father.country}`;

        info.appendChild(life);
        info.appendChild(country);
        info.appendChild(paragraph);

        div.appendChild(h3);
        div.appendChild(info);
        

        fathers.appendChild(div);
        holder.appendChild(fathers);
        document.body.appendChild(holder);
    });
    closeBtn.textContent="close";
    fathers.appendChild(closeBtn);

};

async function getFathers() {
    const response = await fetch("data/fathers.json");
    const data = await response.json();
    console.table(data.fathers);
    console.log("Fathers data:", data.fathers);
    fatherDesplay(data.fathers);
};
getFathers();

getData();

