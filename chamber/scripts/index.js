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
getData();

var date = new Date();
var year = date.getFullYear();
const yearEl = document.getElementById("currentyear");
if (yearEl) yearEl.innerHTML = year;
const lastModEl = document.getElementById("lastModified");
if (lastModEl) lastModEl.innerHTML = document.lastModified;


// Weather Map
const weather = document.querySelector("#weather-icon");
const temp = document.querySelector("#current-temp");
const captionDesc = document.querySelector('figcaption');
const forecast = document.getElementById("weatherforecast");

const myApi = "1826e40be9fc1eaacee027527306cb27";
const lat = 40.75;
const lon = -111.89;

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${myApi}`;

async function apiFetch() {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data); // testing only
    displayResults(data);
}
async function fetchForecast() {
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${myApi}`;
        const resp = await fetch(forecastUrl);
        const fdata = await resp.json();
        // process and render 3-day forecast
        renderThreeDayForecast(fdata);
}

function renderThreeDayForecast(fdata) {
    forecast.innerHTML = ""; // clear previous forecast

    // Today's date string (UTC) to avoid including current day
    const today = new Date();
    const todayDateStr = today.toISOString().split('T')[0];

    // Collect up to 3 entries for the next 3 days at ~12:00:00 (local forecast dt_txt is in UTC)
    const selected = [];
    for (let entry of fdata.list) {
        // entry.dt_txt is like "2026-01-28 12:00:00"
        const [datePart, timePart] = entry.dt_txt.split(" ");
        if (datePart <= todayDateStr) continue; // skip today or in the past
        // Prefer the 12:00:00 entry for a day
        if (timePart === "12:00:00") {
            // ensure we don't add more than one per date
            if (!selected.find(e => e.dt_txt.split(" ")[0] === datePart)) {
                selected.push(entry);
            }
        }
        if (selected.length >= 3) break;
    }

    // Fallback: if we didn't find 12:00 entries (edge case), pick the first entry for each next date
    if (selected.length < 3) {
        const byDate = {};
        for (let entry of fdata.list) {
            const [datePart] = entry.dt_txt.split(" ");
            if (datePart <= todayDateStr) continue;
            if (!byDate[datePart]) byDate[datePart] = entry;
        }
        const dates = Object.keys(byDate).slice(0, 3);
        selected.length = 0;
        for (let d of dates) selected.push(byDate[d]);
    }

    // If still empty, abort
    if (selected.length === 0) {
        container.textContent = "No forecast available.";
        return;
    }

    // Header
    const header = document.createElement("h3");
    header.textContent = "3-Day Forecast";
    container.appendChild(header);

    const listEl = document.createElement("div");
    listEl.className = "forecast-list";
    container.appendChild(listEl);

    selected.forEach(entry => {
        const item = document.createElement("div");
        item.className = "forecast-day";

        // Date / weekday
        const dateStr = entry.dt_txt.split(" ")[0];
        const dateObj = new Date(entry.dt * 1000);
        const dayName = dateObj.toLocaleDateString(undefined, { weekday: "short" });
        const dateLabel = document.createElement("div");
        dateLabel.className = "forecast-day-label";
        dateLabel.textContent = dayName;
        item.appendChild(dateLabel);

        // Icon
        const iconCode = entry.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const img = document.createElement("img");
        img.src = iconUrl;
        img.alt = entry.weather[0].description || "forecast icon";
        img.width = 50;
        img.height = 50;
        item.appendChild(img);

        // Temp (use main.temp or main.temp_max/min if available)
        const t = Math.round(entry.main.temp);
        const tempEl = document.createElement("div");
        tempEl.className = "forecast-temp";
        tempEl.textContent = `${t}\u00B0F`;
        item.appendChild(tempEl);

        // Short description
        const descEl = document.createElement("div");
        descEl.className = "forecast-desc";
        descEl.textContent = entry.weather[0].description || "";
        item.appendChild(descEl);

        listEl.appendChild(item);
    });
}

function displayResults(data) {
    // temperature
    const temperature = data.main.temp;
    if (temp) temp.textContent = `${Math.round(temperature)}\u00B0F`;

    // description
    const desc = data.weather[0].description;
    if (captionDesc) captionDesc.textContent = desc;

    // icon
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    if (weather) {
        weather.setAttribute("src", iconUrl);
        weather.setAttribute("alt", desc || "weather icon");
    }

    // Fetch and display 3-day weather forecast
    fetchForecast();
    
}

apiFetch();