// I used AI to see ideas on how to complete the assignment, but I ended  using what i found to be best, and I wrote most of the code. 
    const navButton = document.querySelector("#ham-btn");
    const navBar = document.querySelector("#nav-bar");
    const lastModEl = document.getElementById("lastModified");
    const captionDesc = document.querySelector("figcaption");
    const callButton = document.querySelector("#call-btn");
    const cardContainer = document.getElementById("card-container");

    // Safe event listeners (self written)
    navButton?.addEventListener("click", () => {
        navButton.classList.toggle("show");
        navBar?.classList.toggle("show");
    });
    //self written
    callButton?.addEventListener("click", () => {
        callButton.classList.toggle("show");
    });

    // Display members (clears container first) (self written)
    const display = (cardDisplay) => {
    cardContainer.innerHTML = ""; // clear previous cards

    cardDisplay.forEach(item => {
        const section = document.createElement('section');
        const name = document.createElement('h2');
        const img = document.createElement('img');
        const address = document.createElement('p');
        const description = document.createElement('p');
        const button = document.createElement('button');

        name.textContent = item.name;
        img.setAttribute("src", item.image);
        img.setAttribute("alt", `${item.name} icon`);
        img.setAttribute("width", `300px`)
        img.setAttribute("height", `200px`)
        address.textContent = item.address;
        description.textContent = item.description;
        button.textContent = "Learn More";

        section.appendChild(name);
        section.appendChild(img);
        section.appendChild(address);
        section.appendChild(description);
        section.appendChild(button);


        cardContainer.appendChild(section);
    });
};

// Fetch members.json with error handling
async function getData() {
    const resp = await fetch("data/discover.json");
    const data = await resp.json();
    console.table(data.members);
    display(data.members);
}

    getData();

    // Last modified
    if (lastModEl) lastModEl.textContent = document.lastModified;