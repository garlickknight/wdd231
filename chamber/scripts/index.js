const navbutton = document.querySelector("#ham-btn");
const navBar = document.querySelector("#nav-bar");
const barbutton = document.querySelector("#bar-btn");
const cards = document.querySelector("#cards");
const one = document.querySelector("#one-card");
const call = document.querySelector("#call");

// Only attach listeners if the elements exist to avoid runtime errors
if (navbutton && navBar) {
    navbutton.addEventListener('click', () => {
        navbutton.classList.toggle('show');
        navBar.classList.toggle("show");
    });
}

if (barbutton && cards) {
    barbutton.addEventListener('click', () => {
        barbutton.classList.toggle("show");
        cards.classList.toggle("hide")
    });
}

if (call) {
    call.addEventListener('click', () => {
        call.classList.toggle("show");
    });
}

const cardContainer = document.getElementById("cards");

const display = (cardDisplay) => {
    if (!cardContainer) {
        console.warn("No #cards container found; skipping card render.");
        return;
    }

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
        if (item.icon) {
            img.setAttribute("src", item.icon);
            img.setAttribute("alt", `${item.name} icon`);
        } else {
            img.setAttribute("alt", `${item.name}`);
        }
        address.textContent = item.address || "";
        phone.textContent = item.phone || "";
        link.textContent = item.website || "";
        if (item.website) {
            link.setAttribute("href", item.website);
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
        }

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
        const response = await fetch("./data/members.json");
        const data = await response.json();
        console.table(data.members); // log members array for debugging
            display(data.members);
}


var date = new Date();
const lastModEl = document.getElementById("lastModified");
if (lastModEl) lastModEl.innerHTML = document.lastModified;


// Weather Map
const weather = document.querySelector("#weather-icon");
const temp = document.querySelector("#current-temp");
const captionDesc = document.querySelector('figcaption');

const myApi = "1826e40be9fc1eaacee027527306cb27";
const lat = 40.75;
const lon = -111.89;

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${myApi}`;
const forecasturl = ``;

async function apiFetch() {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data); // testing only
    displayResults(data);
}

function displayResults(data) {
    // temperature
    const temperature = data.main.temp;
    temp.textContent = `${Math.round(temperature)}\u00B0F`;

    // description
    const desc = data.weather[0].description
    captionDesc.textContent = desc;

    // icon
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weather.setAttribute("src", iconUrl);
    weather.setAttribute("alt", desc || "weather icon");

    // 3 day weather forecas
    // Simple 3-day forecast display (uses current temp/icon as a base)
    (function renderThreeDayForecast() {
        const parentFigure = captionDesc ? captionDesc.closest('figure') : (weather ? weather.parentElement : null);
        const forecastSection = document.getElementById('weatherforecast');

        const now = new Date();
        for (let i = 1; i <= 3; i++) {
            const d = new Date(now);
            d.setDate(now.getDate() + i);
            const dayName = d.toLocaleDateString(undefined, { weekday: 'short' });

            // Simple, deterministic forecast: small offsets from current temperature
            const dayTemp = Math.round(temperature + (i * 2)); // e.g., +2, +4
            const dayDesc = captionDesc ? captionDesc.textContent : (data && data.weather ? data.weather[0].description : '');

            const card = document.createElement('div');
            card.className = 'forecast-day';

            const h = document.createElement('h4');
            h.textContent = dayName;

            const img = document.createElement('img');
            img.src = iconUrl;
            img.alt = dayDesc || 'forecast icon';

            const p = document.createElement('p');
            p.textContent = `${dayTemp}\u00B0F`;
            

            card.appendChild(h);
            card.appendChild(img);
            card.appendChild(p);

            forecastSection.appendChild(card);
        }

        //     if (parentFigure && parentFigure.parentNode) {
        //         parentFigure.parentNode.insertBefore(forecastSection, parentFigure.nextSibling);
        //     } else {
        //         document.body.appendChild(forecastSection);
        //     }
    });
}

apiFetch();