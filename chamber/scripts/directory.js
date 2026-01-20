const navbutton = document.querySelector("#ham-btn");
const navBar = document.querySelector("#nav-bar");

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navBar.classList.toggle("show");
});


const cardContainer = document.getElementById("cards");

const display = (cardDisplay) => {
    cardContainer.innerHTML = ""; // clear previous cards

    cardDisplay.forEach(item => {
        const section = document.createElement('section');
        const name = document.createElement('h2');
        const img = document.createElement('img');
        const address = document.createElement('p');
        const phone = document.createElement('p');
        const linkHolder = document.createElement('p');
        const link = document.createElement("a");

        name.textContent = item.name;
        img.setAttribute("src", item.icon);
        img.setAttribute("alt", `${item.name} icon`);
        address.textContent = item.address;
        phone.textContent = item.phone;
        link.textContent = item.website;
        link.setAttribute("href", item.website);

        linkHolder.appendChild(link);

        section.appendChild(name);
        section.appendChild(img);
        section.appendChild(address);
        section.appendChild(phone);
        section.appendChild(linkHolder);

        cardContainer.appendChild(section);
    });
};

async function getData() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    console.table(data.members); // log members array for debugging
    display(data.members);

}

getData();

var date = new Date();
var year = date.getFullYear();
document.getElementById("currentyear").innerHTML = year;
document.getElementById("lastModified").innerHTML = document.lastModified;