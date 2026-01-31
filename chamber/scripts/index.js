// I used AI to see ideas on how to complete the assignment, but I ended  using what i found to be best, and I wrote most of the code. 
    const navButton = document.querySelector("#ham-btn");
    const navBar = document.querySelector("#nav-bar");
    const callButton = document.querySelector("#call");
    const cardContainer = document.getElementById("cards");
    const lastModEl = document.getElementById("lastModified");
    const weatherImg = document.querySelector("#icon");
    const tempEl = document.querySelector("#current-temp");
    const captionDesc = document.querySelector("figcaption");
    const forecastSection = document.getElementById("weatherforecast");

    const API_KEY = "1826e40be9fc1eaacee027527306cb27";
    const lat = 40.75;
    const lon = -111.89;
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;
    
    // Fetch members.json with error handling (AI written)
    async function getData() {
        const resp = await fetch("data/members.json");
        const data = await resp.json();
        console.table(data.members);
        display(data.members);
}
    //self written
    async function apiFetch() {
        const resp = await fetch(url);
        const data = await resp.json();
        console.log("weather:", data);
        displayResults(data);
    }

    // Safe event listeners (self written)
    navButton.addEventListener("click", () => {
        navButton.classList.toggle("show");
        navBar?.classList.toggle("show");
    });
    //self written
    callButton.addEventListener("click", () => {
        callButton.classList.toggle("show");
    });

    // Display members (clears container first) (self written)
const display = (members = []) => {
    cardContainer.innerHTML = "";
    // AI assisted to help me learn the slice concept (I wrote the code).
    const toShow = members.slice(0, 3);
    // self written
    toShow.forEach(item => {
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

getData();

// I wrote this code, and I talked about places that AI helped me out. 
function displayResults(data = {}) {
    const tempature = Math.round(data.main.temp);
    tempEl.textContent = `${tempature}\u00B0F`;
    //AI asisted me by helping me figure out why I couldnt desplay my weather icon on my screen.
    // I did not understand that I needed to pull the image from another place on the API.
    // I thought I just needed the icon code and that would desplay the image.
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    let img = weatherImg.src = iconUrl;
    let weatherDescription = data.weather[0].description;
    captionDesc.textContent = weatherDescription;
    forecastSection.innerHTML = "";

    // AI helped me with syntax and organizaton.
    const now = new Date();
    for (let i = 1; i <= 3; i++){
        const date = new Date(now);
        date.setDate(now.getDate() + i);
        const dayName = date.toLocaleDateString(undefined, { weekday: "short" });
        const dayTemp = tempature + i * 2;
        // use a fallback to the current description to avoid accessing undefined entries (created by AI)
        const dayDesc = data.weather[i]?.description || weatherDescription;

        const card = document.createElement('div');
        const day = document.createElement('h2');
        const forcastIcon = document.createElement('img');
        const forcastTemp = document.createElement('p');

        day.textContent = dayName;
        forcastIcon.setAttribute('src', img);
        forcastIcon.setAttribute('alt', dayDesc);

        forcastTemp.textContent = `${dayTemp}\u00B0F`;

        card.appendChild(day);
        card.appendChild(forcastIcon);
        card.appendChild(forcastTemp);

        forecastSection.appendChild(card);
    }
}


apiFetch();
    
// Last modified
if (lastModEl) lastModEl.textContent = document.lastModified;
